import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../shared/LoadingSpinner';

// Import rubric data for each scenario
import { 
  initialInquiryRubric, 
  qualificationCallRubric, 
  venueTourRubric, 
  proposalPresentationRubric 
} from '../../data/rubricData';

const RubricEvaluation = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [rubricData, setRubricData] = useState(null);
  const [staffName, setStaffName] = useState('');
  const [evaluatorName, setEvaluatorName] = useState('');
  const [evaluationDate, setEvaluationDate] = useState(new Date().toISOString().split('T')[0]);
  const [scenarioName, setScenarioName] = useState('');
  const [criteria, setCriteria] = useState([]);
  const [strengths, setStrengths] = useState(['', '', '']);
  const [improvements, setImprovements] = useState(['', '', '']);
  const [actionItems, setActionItems] = useState(['', '', '']);
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  
  // Get scenario rubric data based on scenarioId
  useEffect(() => {
    setIsLoading(true);
    let selectedRubric;
    let scenarioTitle;
    
    switch(scenarioId) {
      case 'initial-inquiry':
        selectedRubric = initialInquiryRubric;
        scenarioTitle = 'Initial Inquiry Response';
        break;
      case 'qualification-call':
        selectedRubric = qualificationCallRubric;
        scenarioTitle = 'Qualification Call';
        break;
      case 'venue-tour':
        selectedRubric = venueTourRubric;
        scenarioTitle = 'Venue Tour';
        break;
      case 'proposal-presentation':
        selectedRubric = proposalPresentationRubric;
        scenarioTitle = 'Proposal Presentation';
        break;
      default:
        navigate('/simulator');
        return;
    }
    
    if (selectedRubric) {
      // Initialize criteria with scores of 0
      const initializedCriteria = selectedRubric.criteria.map(criterion => ({
        ...criterion,
        score: 0,
        notes: ''
      }));
      
      setCriteria(initializedCriteria);
      setRubricData(selectedRubric);
      setScenarioName(scenarioTitle);
      
      // Prefill evaluator name if user is logged in
      if (currentUser) {
        setEvaluatorName(currentUser.email.split('@')[0] || '');
      }
    }
    
    setIsLoading(false);
  }, [scenarioId, navigate, currentUser]);
  
  // Calculate total score whenever criteria scores change
  useEffect(() => {
    if (criteria.length === 0) return;
    
    const calculatedTotal = criteria.reduce((total, criterion) => {
      return total + ((criterion.score || 0) * (criterion.weight / 100));
    }, 0);
    
    setTotalScore(calculatedTotal.toFixed(2));
  }, [criteria]);
  
  // Handle score change for a criterion
  const handleScoreChange = (index, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index].score = parseFloat(value);
    setCriteria(updatedCriteria);
  };
  
  // Handle notes change for a criterion
  const handleNotesChange = (index, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index].notes = value;
    setCriteria(updatedCriteria);
  };
  
  // Handle strength change
  const handleStrengthChange = (index, value) => {
    const updatedStrengths = [...strengths];
    updatedStrengths[index] = value;
    setStrengths(updatedStrengths);
  };
  
  // Handle improvement change
  const handleImprovementChange = (index, value) => {
    const updatedImprovements = [...improvements];
    updatedImprovements[index] = value;
    setImprovements(updatedImprovements);
  };
  
  // Handle action item change
  const handleActionItemChange = (index, value) => {
    const updatedActionItems = [...actionItems];
    updatedActionItems[index] = value;
    setActionItems(updatedActionItems);
  };
  
  // Get performance rating based on score
  const getPerformanceRating = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 4.5) return 'Outstanding';
    if (numScore >= 4.0) return 'Excellent';
    if (numScore >= 3.5) return 'Very Good';
    if (numScore >= 3.0) return 'Satisfactory';
    if (numScore >= 2.5) return 'Needs Improvement';
    return 'Unsatisfactory';
  };
  
  // Export to PDF
  const exportToPDF = async () => {
    setIsExporting(true);
    setExportError(null);
    
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Set font
      pdf.setFont('helvetica');
      
      // A4 dimensions in mm (210 x 297)
      const pageWidth = 210;
      const pageHeight = 297;
      
      // Add margins (15mm on each side)
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      
      // Start position
      let y = margin;
      
      // Add title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(scenarioName + ' Evaluation', margin, y);
      y += 10;
      
      // Add header information
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Staff Member: ${staffName}`, margin, y);
      y += 7;
      pdf.text(`Evaluator: ${evaluatorName}`, margin, y);
      y += 7;
      pdf.text(`Date: ${evaluationDate}`, margin, y);
      y += 10;
      
      // Add scoring scale
      pdf.setFont('helvetica', 'bold');
      pdf.text('Scoring Scale:', margin, y);
      y += 7;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      rubricData.scoringScale.forEach(level => {
        pdf.text(`${level.value} - ${level.label}: ${level.description}`, margin, y);
        y += 5;
      });
      y += 10;
      
      // Add criteria table header
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Performance Evaluation', margin, y);
      y += 7;
      
      // Define column widths
      const colWidths = [80, 20, 20, 70];
      const colPositions = [
        margin,
        margin + colWidths[0],
        margin + colWidths[0] + colWidths[1],
        margin + colWidths[0] + colWidths[1] + colWidths[2]
      ];
      
      // Draw table header
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Criterion', colPositions[0], y);
      pdf.text('Weight', colPositions[1], y);
      pdf.text('Score', colPositions[2], y);
      pdf.text('Notes/Evidence', colPositions[3], y);
      
      // Draw horizontal line
      pdf.setDrawColor(0);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y + 2, margin + contentWidth, y + 2);
      y += 7;
      
      // Add criteria rows
      pdf.setFont('helvetica', 'normal');
      
      criteria.forEach((criterion, index) => {
        // Check if we need a new page
        if (y > pageHeight - 50) {
          pdf.addPage();
          y = margin;
        }
        
        // Criterion name
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.text(criterion.name, colPositions[0], y);
        y += 5;
        
        // Criterion description
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.text(criterion.description, colPositions[0], y);
        y += 5;
        
        // Weight
        pdf.text(`${criterion.weight}%`, colPositions[1], y - 10);
        
        // Score (as a number)
        const scoreText = criterion.score ? criterion.score.toString() : '-';
        pdf.text(scoreText, colPositions[2], y - 10);
        
        // Notes
        if (criterion.notes) {
          // Split notes into lines that fit within the column width
          const notesLines = pdf.splitTextToSize(criterion.notes, colWidths[3]);
          pdf.text(notesLines, colPositions[3], y - 10);
          y += (notesLines.length * 4) + 2;
        } else {
          y += 7;
        }
        
        // Draw horizontal line between rows
        pdf.setDrawColor(200);
        pdf.setLineWidth(0.2);
        pdf.line(margin, y, margin + contentWidth, y);
        y += 5;
      });
      
      // Add total score
      if (y > pageHeight - 30) {
        pdf.addPage();
        y = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(`Total Score: ${totalScore} / 5.00`, margin, y);
      y += 10;
      
      // Add strengths
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Strengths:', margin, y);
      y += 7;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      strengths.forEach((strength, index) => {
        if (strength) {
          if (y > pageHeight - 30) {
            pdf.addPage();
            y = margin;
          }
          
          pdf.text(`${index + 1}. ${strength}`, margin, y);
          y += 7;
        }
      });
      
      // Add areas for improvement
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Areas for Improvement:', margin, y);
      y += 7;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      improvements.forEach((improvement, index) => {
        if (improvement) {
          if (y > pageHeight - 30) {
            pdf.addPage();
            y = margin;
          }
          
          pdf.text(`${index + 1}. ${improvement}`, margin, y);
          y += 7;
        }
      });
      
      // Add action items
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Action Items:', margin, y);
      y += 7;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      actionItems.forEach((item, index) => {
        if (item) {
          if (y > pageHeight - 30) {
            pdf.addPage();
            y = margin;
          }
          
          pdf.text(`${index + 1}. ${item}`, margin, y);
          y += 7;
        }
      });
      
      // Add additional comments
      if (comments) {
        if (y > pageHeight - 50) {
          pdf.addPage();
          y = margin;
        }
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.text('Additional Comments:', margin, y);
        y += 7;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const commentLines = pdf.splitTextToSize(comments, contentWidth);
        pdf.text(commentLines, margin, y);
      }
      
      // Add signature section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Signatures:', margin, y);
      y += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text('Staff Member: _____________________', margin, y);
      y += 7;
      pdf.text('Evaluator: _____________________', margin, y);
      y += 7;
      pdf.text('Manager: _____________________', margin, y);
      
      // Save the PDF
      pdf.save(`${scenarioName.replace(/\s+/g, '-').toLowerCase()}-evaluation-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      setExportError('Failed to export evaluation. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you could save the evaluation data to your database
    // For now, we'll just export to PDF
    exportToPDF();
  };
  
  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }
  
  if (!rubricData) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-600">Error: Rubric data not found for this scenario.</p>
        <button
          onClick={() => navigate('/simulator')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Simulator
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-darkBrown mb-6">{scenarioName} Evaluation</h1>
        
        <form onSubmit={handleSubmit}>
          <div id="rubric-content" className="space-y-8">
            {/* Header Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member Name</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evaluator Name</label>
                <input
                  type="text"
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Evaluation</label>
                <input
                  type="date"
                  value={evaluationDate}
                  onChange={(e) => setEvaluationDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scenario</label>
                <input
                  type="text"
                  value={scenarioName}
                  readOnly
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            {/* Scoring Table */}
            <div>
              <h2 className="text-xl font-semibold text-darkBrown mb-4">Performance Evaluation</h2>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Scoring Scale</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {rubricData.scoringScale.map((level) => (
                    <div key={level.value} className="p-2 bg-gray-50 rounded-md">
                      <div className="font-medium text-gray-900">{level.label} ({level.value})</div>
                      <div className="text-sm text-gray-600">{level.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criterion</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score (1-5)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes/Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {criteria.map((criterion, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-normal">
                          <div className="text-sm font-medium text-gray-900">{criterion.name}</div>
                          <div className="text-xs text-gray-500 mb-2">{criterion.description}</div>
                          <div className="space-y-1">
                            <div className="text-xs text-red-600">
                              <span className="font-medium">Poor: </span>
                              {criterion.levels.poor}
                            </div>
                            <div className="text-xs text-blue-600">
                              <span className="font-medium">Satisfactory: </span>
                              {criterion.levels.satisfactory}
                            </div>
                            <div className="text-xs text-green-600">
                              <span className="font-medium">Excellent: </span>
                              {criterion.levels.excellent}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {criterion.weight}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={criterion.score || 0}
                            onChange={(e) => handleScoreChange(index, e.target.value)}
                            className={`w-full p-2 border border-gray-300 rounded ${
                              criterion.score >= 4 ? 'text-green-600' :
                              criterion.score >= 3 ? 'text-blue-600' :
                              criterion.score > 0 ? 'text-red-600' :
                              ''
                            }`}
                            style={{ minHeight: '40px', fontSize: '14px' }}
                            required
                          >
                            <option value={0}>Select...</option>
                            {rubricData.scoringScale.map((level) => (
                              <option 
                                key={level.value} 
                                value={level.value}
                                style={{ padding: '8px' }}
                                className={
                                  level.value >= 4 ? 'text-green-600' :
                                  level.value >= 3 ? 'text-blue-600' :
                                  'text-red-600'
                                }
                              >
                                {level.value} - {level.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-normal">
                          <textarea
                            value={criterion.notes || ''}
                            onChange={(e) => handleNotesChange(index, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="2"
                            placeholder="Enter specific examples..."
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100">
                      <td colSpan="2" className="px-6 py-4 text-right font-bold">
                        Total Score:
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {totalScore} / 5.00
                      </td>
                      <td className="px-6 py-4 font-medium">
                        Rating: <span className={`font-bold ${
                          parseFloat(totalScore) >= 4.5 ? 'text-green-600' : 
                          parseFloat(totalScore) >= 4.0 ? 'text-green-500' :
                          parseFloat(totalScore) >= 3.5 ? 'text-blue-600' :
                          parseFloat(totalScore) >= 3.0 ? 'text-blue-500' :
                          'text-red-600'
                        }`}>{getPerformanceRating(totalScore)}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            {/* Feedback Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg font-medium text-green-800 mb-3">Strengths</h3>
                {strengths.map((strength, index) => (
                  <div key={`strength-${index}`} className="mb-3">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-green-200 text-green-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1">
                        {index + 1}
                      </span>
                      <textarea
                        value={strength}
                        onChange={(e) => handleStrengthChange(index, e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded"
                        rows="2"
                        placeholder="Enter a specific strength..."
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Areas for Improvement */}
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-medium text-red-800 mb-3">Areas for Improvement</h3>
                {improvements.map((improvement, index) => (
                  <div key={`improvement-${index}`} className="mb-3">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-red-200 text-red-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1">
                        {index + 1}
                      </span>
                      <textarea
                        value={improvement}
                        onChange={(e) => handleImprovementChange(index, e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded"
                        rows="2"
                        placeholder="Enter an area for improvement..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Items */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-3">Action Items</h3>
              {actionItems.map((item, index) => (
                <div key={`action-${index}`} className="mb-3">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 bg-blue-200 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1">
                      {index + 1}
                    </span>
                    <textarea
                      value={item}
                      onChange={(e) => handleActionItemChange(index, e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded"
                      rows="2"
                      placeholder="Enter a specific action item..."
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional Comments */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Additional Comments</h3>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                rows="4"
                placeholder="Enter any additional comments or observations..."
              />
            </div>
            
            {/* Signature Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Staff Member Signature</p>
                <div className="h-12 bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">To be signed</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Evaluator Signature</p>
                <div className="h-12 bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">To be signed</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Manager Signature</p>
                <div className="h-12 bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">To be signed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Error Message */}
          {exportError && (
            <div className="my-4 p-3 bg-red-100 text-red-700 rounded-md">
              {exportError}
            </div>
          )}
          
          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={isExporting}
              className={`px-6 py-3 bg-primary-600 text-white rounded-md font-medium flex items-center ${
                isExporting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'
              }`}
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>Export as PDF</>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/simulator')}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RubricEvaluation; 