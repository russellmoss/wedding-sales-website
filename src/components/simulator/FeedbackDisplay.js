import React, { useState, useEffect } from 'react';
import { useSimulator } from '../../contexts/SimulatorContext';
import { useInteractionTracker } from '../../contexts/InteractionTracker';
import { useEmotion } from '../../contexts/EmotionContext';
import { generateFeedbackReport, generateAndExportFeedbackReport } from '../../utils/feedbackReport';
import './FeedbackDisplay.css';
import EnhancedFeedbackDisplay from './EnhancedFeedbackDisplay';

const FeedbackDisplay = () => {
  const { feedback, currentScenario, chatHistory } = useSimulator();
  const { getAllInteractions } = useInteractionTracker();
  const { getEmotionalJourney } = useEmotion();
  const [parsedFeedback, setParsedFeedback] = useState({
    issues: [],
    strengths: [],
    score: 0,
    detailedFeedback: ''
  });
  const [interactions, setInteractions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  useEffect(() => {
    if (feedback) {
      setIsLoading(true);
      try {
        // Parse the feedback to extract issues, strengths, score, and detailed feedback
        const issuesMatch = feedback.rawResponse?.match(/Issues:?\s*([\s\S]*?)(?=Strengths:|Score:|$)/i);
        const strengthsMatch = feedback.rawResponse?.match(/Strengths:?\s*([\s\S]*?)(?=Score:|$)/i);
        const scoreMatch = feedback.rawResponse?.match(/Score:\s*(\d+)%/i);
        const feedbackMatch = feedback.rawResponse?.match(/Feedback:?\s*([\s\S]*?)$/i);
        
        const issues = issuesMatch ? issuesMatch[1].trim().split('\n').filter(line => line.trim()) : [];
        const strengths = strengthsMatch ? strengthsMatch[1].trim().split('\n').filter(line => line.trim()) : [];
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
        const detailedFeedback = feedbackMatch ? feedbackMatch[1].trim() : '';
        
        setParsedFeedback({
          issues,
          strengths,
          score,
          detailedFeedback
        });
        
        // Get tracked interactions
        setInteractions(getAllInteractions());
      } catch (error) {
        console.error('Error parsing feedback:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [feedback, getAllInteractions]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    
    try {
      const emotionalData = getEmotionalJourney();
      const filename = `feedback-report-${new Date().toISOString().split('T')[0]}.pdf`;
      
      await generateAndExportFeedbackReport(
        {
          overallScore: parsedFeedback.score,
          summary: parsedFeedback.detailedFeedback,
          strengths: parsedFeedback.strengths,
          areasForImprovement: parsedFeedback.issues,
          actionItems: interactions?.actionItems || []
        },
        chatHistory,
        emotionalData,
        filename
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      setDownloadError('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading feedback...</div>;
  }

  return (
    <div className="feedback-display">
      <div className="flex justify-between items-center mb-6">
        <h2>Simulation Feedback</h2>
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isDownloading ? 'Generating PDF...' : 'Download PDF Report'}
        </button>
      </div>

      {downloadError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {downloadError}
        </div>
      )}

      <EnhancedFeedbackDisplay
        feedback={{
          score: parsedFeedback.score,
          issues: parsedFeedback.issues,
          strengths: parsedFeedback.strengths,
          detailedFeedback: parsedFeedback.detailedFeedback,
          interactions: interactions
        }}
      />
    </div>
  );
};

export default FeedbackDisplay; 