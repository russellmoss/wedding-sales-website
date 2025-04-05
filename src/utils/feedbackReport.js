/**
 * Generates a comprehensive feedback report in HTML format
 * that can be converted to PDF or shared with management
 * @param {Object} feedback - The feedback data
 * @param {Array} messages - The conversation transcript
 * @param {Object} emotionalData - Emotional journey data
 * @returns {string} - HTML content for the report
 */
export function generateFeedbackReport(feedback, messages, emotionalData) {
  // Helper function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  // Helper function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };
  
  // Helper function to get badge class based on text
  const getBadgeClass = (text) => {
    if (text.toLowerCase().includes('strength') || text.toLowerCase().includes('positive')) 
      return 'badge-success';
    if (text.toLowerCase().includes('improvement') || text.toLowerCase().includes('negative')) 
      return 'badge-warning';
    return 'badge-info';
  };
  
  // Generate conversation transcript with highlights
  const generateTranscriptWithHighlights = () => {
    const highlightPatterns = {
      preparation: [
        /as you mentioned earlier/i,
        /based on your inquiry/i,
        /from your email/i
      ],
      rapport: [
        /congratulations/i,
        /how exciting/i,
        /wonderful news/i,
        /that sounds lovely/i
      ],
      budgetDiscussion: [
        /understand.*budget/i,
        /flexible options/i,
        /work with your budget/i,
        /pricing concerns/i
      ],
      activeListening: [
        /you mentioned/i,
        /as you said/i,
        /i heard you say/i,
        /sounds like you/i
      ]
    };
    
    return messages.map((msg, i) => {
      let content = msg.content;
      const role = msg.type === 'user' ? 'Sales Representative' : 'Client';
      
      // Apply highlighting based on message content
      if (msg.type === 'user') { // Only highlight sales rep messages
        Object.entries(highlightPatterns).forEach(([criterion, patterns]) => {
          patterns.forEach(pattern => {
            content = content.replace(pattern, match => 
              `<span class="highlight ${criterion}">${match}</span>`
            );
          });
        });
      }
      
      // Add emotional state for client messages
      let emotionDisplay = '';
      if (msg.type === 'assistant' && emotionalData && emotionalData.emotionalJourney) {
        const emotionRecord = emotionalData.emotionalJourney.find(record => 
          record.timestamp === msg.timestamp
        );
        
        if (emotionRecord) {
          emotionDisplay = `<span class="emotion-tag" style="background-color: ${getEmotionColor(emotionRecord.emotion)}">
            ${emotionRecord.emotion} (${Math.round(emotionRecord.intensity * 100)}%)
          </span>`;
        }
      }
      
      return `
        <div class="message ${msg.type}">
          <div class="message-header">
            <span class="message-role">${role}</span>
            <span class="message-time">${formatDate(msg.timestamp)}</span>
            ${emotionDisplay}
          </div>
          <div class="message-content">${content}</div>
        </div>
      `;
    }).join('');
  };
  
  // Generate emotion journey chart data
  const generateEmotionJourneyData = () => {
    if (!emotionalData || !emotionalData.emotionalJourney || emotionalData.emotionalJourney.length === 0) {
      return '<p>No emotional journey data available.</p>';
    }
    
    const emotions = emotionalData.emotionalJourney.map(record => record.emotion);
    const intensities = emotionalData.emotionalJourney.map(record => Math.round(record.intensity * 100));
    const timestamps = emotionalData.emotionalJourney.map(record => {
      const date = new Date(record.timestamp);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    });
    
    // Create annotations for negative spikes if they exist
    let annotations = [];
    if (emotionalData.negativeSpikes && emotionalData.negativeSpikes.length > 0) {
      annotations = emotionalData.negativeSpikes.map((spike, i) => {
        const index = emotionalData.emotionalJourney.findIndex(j => j.timestamp === spike.timestamp);
        return {
          type: 'point',
          xValue: index,
          yValue: Math.round(spike.intensity * 100),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          radius: 8
        };
      });
    }
    
    return `
      <div class="chart-container">
        <canvas id="emotionChart" width="600" height="200"></canvas>
      </div>
      <script>
        const emotionCtx = document.getElementById('emotionChart').getContext('2d');
        new Chart(emotionCtx, {
          type: 'line',
          data: {
            labels: ${JSON.stringify(timestamps)},
            datasets: [{
              label: 'Emotion Intensity',
              data: ${JSON.stringify(intensities)},
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              tension: 0.3
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Intensity (%)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Time'
                }
              }
            },
            plugins: {
              annotation: {
                annotations: ${JSON.stringify(annotations)}
              }
            }
          }
        });
      </script>
    `;
  };
  
  // Generate criteria score chart data
  const generateCriteriaChartData = () => {
    if (!feedback.scores || Object.keys(feedback.scores).length === 0) {
      return '<p>No criteria scores available.</p>';
    }
    
    const criteriaLabels = Object.keys(feedback.scores).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
    );
    
    const criteriaScores = Object.values(feedback.scores);
    
    return `
      <div class="chart-container">
        <canvas id="criteriaChart" width="600" height="300"></canvas>
      </div>
      <script>
        const criteriaCtx = document.getElementById('criteriaChart').getContext('2d');
        new Chart(criteriaCtx, {
          type: 'bar',
          data: {
            labels: ${JSON.stringify(criteriaLabels)},
            datasets: [{
              label: 'Criteria Scores',
              data: ${JSON.stringify(criteriaScores)},
              backgroundColor: ${JSON.stringify(criteriaScores.map(score => getScoreColor(score)))},
              borderColor: ${JSON.stringify(criteriaScores.map(score => getScoreColor(score)))},
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Score (%)'
                }
              }
            },
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      </script>
    `;
  };
  
  // Generate the HTML report
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sales Conversation Feedback Report</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation"></script>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .report-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .report-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .report-subtitle {
          font-size: 16px;
          color: #666;
        }
        
        .report-date {
          font-size: 14px;
          color: #888;
        }
        
        .report-section {
          margin-bottom: 30px;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .overall-score {
          text-align: center;
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .score-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 36px;
          font-weight: bold;
          color: white;
        }
        
        .score-label {
          font-size: 18px;
          font-weight: bold;
        }
        
        .chart-container {
          margin: 20px 0;
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        
        .criteria-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        .criteria-table th, .criteria-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
        
        .criteria-table th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        
        .message {
          margin-bottom: 15px;
          padding: 15px;
          border-radius: 5px;
        }
        
        .message.user {
          background-color: #f0f7ff;
          border-left: 4px solid #4a86e8;
        }
        
        .message.assistant {
          background-color: #f9f9f9;
          border-left: 4px solid #999;
        }
        
        .message-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .message-role {
          font-weight: bold;
          margin-right: 10px;
        }
        
        .message-time {
          font-size: 12px;
          color: #999;
        }
        
        .emotion-tag {
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 12px;
          color: white;
          margin-left: 10px;
        }
        
        .highlight {
          padding: 2px 4px;
          border-radius: 3px;
        }
        
        .highlight.preparation {
          background-color: rgba(255, 193, 7, 0.2);
          border: 1px solid rgba(255, 193, 7, 0.5);
        }
        
        .highlight.rapport {
          background-color: rgba(76, 175, 80, 0.2);
          border: 1px solid rgba(76, 175, 80, 0.5);
        }
        
        .highlight.budgetDiscussion {
          background-color: rgba(33, 150, 243, 0.2);
          border: 1px solid rgba(33, 150, 243, 0.5);
        }
        
        .highlight.activeListening {
          background-color: rgba(156, 39, 176, 0.2);
          border: 1px solid rgba(156, 39, 176, 0.5);
        }
        
        .badge {
          display: inline-block;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: bold;
          border-radius: 12px;
          color: white;
        }
        
        .badge-success {
          background-color: #4CAF50;
        }
        
        .badge-warning {
          background-color: #FF9800;
        }
        
        .badge-info {
          background-color: #2196F3;
        }
        
        .improvement-suggestions {
          padding: 15px;
          background-color: #fff8e1;
          border-left: 4px solid #ffc107;
          margin: 20px 0;
        }
        
        .suggestion-example {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 10px;
        }
        
        .example-original, .example-improved {
          padding: 10px;
          border-radius: 5px;
        }
        
        .example-original {
          background-color: #ffebee;
          border-left: 4px solid #f44336;
        }
        
        .example-improved {
          background-color: #e8f5e9;
          border-left: 4px solid #4caf50;
        }
        
        .action-items {
          margin-top: 20px;
        }
        
        .action-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        
        .action-item-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #4a86e8;
          color: white;
          font-weight: bold;
          margin-right: 15px;
          flex-shrink: 0;
        }
        
        .action-item-content {
          flex-grow: 1;
        }
        
        .action-item-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .conversation-highlights {
          margin-top: 20px;
        }
        
        .highlight-item {
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        
        .highlight-positive {
          background-color: #e8f5e9;
          border-left: 4px solid #4caf50;
        }
        
        .highlight-negative {
          background-color: #ffebee;
          border-left: 4px solid #f44336;
        }
        
        .highlight-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .highlight-impact {
          font-style: italic;
          margin-top: 10px;
        }
        
        @media print {
          body {
            padding: 0;
            margin: 20px;
          }
          
          .report-section {
            page-break-inside: avoid;
            box-shadow: none;
            border: 1px solid #eee;
          }
        }
      </style>
    </head>
    <body>
      <div class="report-header">
        <div class="report-title">Sales Conversation Feedback Report</div>
        <div class="report-subtitle">Performance Analysis and Improvement Suggestions</div>
        <div class="report-date">Generated on ${formatDate(new Date())}</div>
      </div>
      
      <div class="report-section">
        <div class="section-title">Performance Summary</div>
        <div class="overall-score">
          <div class="score-circle" style="background-color: ${getScoreColor(feedback.overallScore)}">
            ${feedback.overallScore}%
          </div>
          <div class="score-label">Overall Score</div>
        </div>
        <p>${feedback.summary || 'No summary available.'}</p>
      </div>
      
      <div class="report-section">
        <div class="section-title">Criteria Scores</div>
        ${generateCriteriaChartData()}
        <table class="criteria-table">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Score</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(feedback.scores || {}).map(([key, score]) => `
              <tr>
                <td>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
                <td style="color: ${getScoreColor(score)}">${score}%</td>
                <td>
                  ${feedback.feedback && feedback.feedback[key] ? 
                    feedback.feedback[key].map(f => `
                      <div class="feedback-item">
                        <span class="badge ${getBadgeClass(f.type)}">${f.type}</span>
                        ${f.message}
                      </div>
                    `).join('') : 'No feedback available'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="report-section">
        <div class="section-title">Strengths & Areas for Improvement</div>
        <h3>Key Strengths</h3>
        <ul>
          ${feedback.strengths ? feedback.strengths.map(strength => `<li>${strength}</li>`).join('') : '<li>No strengths identified.</li>'}
        </ul>
        
        <h3>Areas for Improvement</h3>
        <ul>
          ${feedback.areasForImprovement ? feedback.areasForImprovement.map(area => `<li>${area}</li>`).join('') : '<li>No areas for improvement identified.</li>'}
        </ul>
      </div>
      
      <div class="report-section">
        <div class="section-title">Specific Examples & Suggestions</div>
        ${feedback.specificExamples && feedback.specificExamples.length > 0 ? 
          feedback.specificExamples.map((example, i) => `
            <div class="improvement-suggestions">
              <h3>${example.criterion}: ${example.issue}</h3>
              <div class="suggestion-example">
                <div class="example-original">
                  <strong>Original:</strong>
                  <p>${example.example}</p>
                </div>
                <div class="example-improved">
                  <strong>Improved:</strong>
                  <p>${example.improvement}</p>
                </div>
              </div>
              <p><strong>Impact:</strong> ${example.impact}</p>
            </div>
          `).join('') : '<p>No specific examples available.</p>'}
      </div>
      
      <div class="report-section">
        <div class="section-title">Customer Emotional Journey</div>
        <p>This chart shows how the client's emotional state evolved throughout the conversation, with a focus on intensity and significant emotional shifts.</p>
        ${generateEmotionJourneyData()}
        <div class="emotional-insights">
          <h3>Key Emotional Insights</h3>
          <ul>
            <li>Initial emotional state: <strong>${emotionalData.initialEmotion || 'Neutral'}</strong></li>
            <li>Final emotional state: <strong>${emotionalData.finalEmotion || 'Neutral'}</strong></li>
            <li>Emotional shifts: <strong>${emotionalData.shifts?.length || 0}</strong></li>
            <li>Negative emotion spikes: <strong>${emotionalData.negativeSpikes?.length || 0}</strong></li>
          </ul>
        </div>
      </div>
      
      <div class="report-section">
        <div class="section-title">Conversation Highlights</div>
        <div class="conversation-highlights">
          ${feedback.conversationHighlights && feedback.conversationHighlights.length > 0 ? 
            feedback.conversationHighlights.map(highlight => `
              <div class="highlight-item ${highlight.type === 'positive' ? 'highlight-positive' : 'highlight-negative'}">
                <div class="highlight-title">${highlight.title}</div>
                <div class="highlight-messages">
                  <p><strong>Client:</strong> ${highlight.clientMessage}</p>
                  <p><strong>Sales Rep:</strong> ${highlight.salesResponse}</p>
                </div>
                <div class="highlight-impact">${highlight.impact}</div>
              </div>
            `).join('') : '<p>No conversation highlights available.</p>'}
        </div>
      </div>
      
      <div class="report-section">
        <div class="section-title">Action Items</div>
        <div class="action-items">
          ${feedback.actionItems && feedback.actionItems.length > 0 ? 
            feedback.actionItems.map((item, i) => `
              <div class="action-item">
                <div class="action-item-number">${i + 1}</div>
                <div class="action-item-content">
                  <div class="action-item-title">${item.title}</div>
                  <div class="action-item-description">${item.description}</div>
                </div>
              </div>
            `).join('') : '<p>No action items available.</p>'}
        </div>
      </div>
      
      <div class="report-section">
        <div class="section-title">Conversation Transcript with Highlights</div>
        <div class="transcript">
          ${generateTranscriptWithHighlights()}
        </div>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

/**
 * Helper function to get color based on emotion
 */
function getEmotionColor(emotion) {
  const colors = {
    excited: '#4CAF50',
    interested: '#9C27B0',
    neutral: '#9E9E9E',
    concerned: '#FFC107',
    frustrated: '#F44336'
  };
  
  return colors[emotion] || colors.neutral;
}

/**
 * Exports the feedback report as a PDF
 * @param {string} html - The HTML content of the report
 * @param {string} filename - The filename for the PDF
 * @returns {Promise} - A promise that resolves when the PDF is generated
 */
export function exportFeedbackReportAsPDF(html, filename = 'feedback-report.pdf') {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a temporary container for the HTML content
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);

      // Import required modules
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      // Convert HTML to canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let currentPage = 1;

      // Add pages with content
      while (heightLeft >= 0) {
        if (currentPage > 1) {
          pdf.addPage();
        }

        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight;
        position -= pageHeight;
        currentPage++;
      }

      // Save the PDF
      pdf.save(filename);

      // Clean up
      document.body.removeChild(container);

      resolve({
        success: true,
        filename,
        message: 'PDF generated successfully'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
}

/**
 * Generates a comprehensive feedback report and exports it as a PDF
 * @param {Object} feedback - The feedback data
 * @param {Array} messages - The conversation transcript
 * @param {Object} emotionalData - Emotional journey data
 * @param {string} filename - The filename for the PDF
 * @returns {Promise} - A promise that resolves when the PDF is generated
 */
export function generateAndExportFeedbackReport(feedback, messages, emotionalData, filename = 'feedback-report.pdf') {
  const html = generateFeedbackReport(feedback, messages, emotionalData);
  return exportFeedbackReportAsPDF(html, filename);
} 