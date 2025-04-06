import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ChatExport = () => {
  const navigate = useNavigate();
  const { chatHistory, currentScenario, resetSimulation } = useSimulator();
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const exportToPDF = async () => {
    if (!chatHistory || chatHistory.length === 0) {
      setExportError('No conversation to export. Please start a new simulation.');
      return;
    }

    setIsExporting(true);
    setExportError(null);
    
    try {
      // Create a temporary div to render the chat for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.style.width = '750px'; // Slightly narrower than before
      tempDiv.style.padding = '40px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      
      // Add title and scenario info
      const titleDiv = document.createElement('div');
      titleDiv.innerHTML = `
        <h1 style="font-size: 24px; text-align: center; margin-bottom: 20px; color: #333;">Sales Conversation Transcript</h1>
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
          <p style="margin: 5px 0;"><strong>Scenario:</strong> ${currentScenario?.title || 'Wedding Venue Sales'}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p style="margin: 5px 0;"><strong>Description:</strong> ${currentScenario?.description || 'A conversation with a potential client about booking a wedding venue'}</p>
        </div>
      `;
      tempDiv.appendChild(titleDiv);
      
      // Add chat messages
      const chatDiv = document.createElement('div');
      chatDiv.style.marginBottom = '20px';
      
      chatHistory.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '15px';
        messageDiv.style.padding = '12px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.maxWidth = '80%'; // Make messages narrower
        messageDiv.style.wordWrap = 'break-word';
        
        // Style based on message type
        if (message.type === 'user') {
          messageDiv.style.backgroundColor = '#e6f7ff';
          messageDiv.style.marginLeft = 'auto'; // Right align
          messageDiv.style.marginRight = '0';
          messageDiv.style.borderLeft = '4px solid #1890ff';
        } else if (message.type === 'assistant') {
          messageDiv.style.backgroundColor = '#f6ffed';
          messageDiv.style.marginRight = 'auto'; // Left align
          messageDiv.style.marginLeft = '0';
          messageDiv.style.borderLeft = '4px solid #52c41a';
        } else if (message.type === 'system') {
          messageDiv.style.backgroundColor = '#fff7e6';
          messageDiv.style.margin = '0 auto'; // Center align
          messageDiv.style.borderLeft = '4px solid #faad14';
        }
        
        // Add timestamp and content
        messageDiv.innerHTML = `
          <div style="font-size: 12px; color: #888; margin-bottom: 5px;">
            ${message.type === 'user' ? 'Sales Representative' : message.type === 'assistant' ? 'Customer (Sarah & Michael)' : 'System'} - ${formatDate(message.timestamp)}
          </div>
          <div style="white-space: pre-wrap; font-size: 14px;">${message.content}</div>
        `;
        
        chatDiv.appendChild(messageDiv);
      });
      
      tempDiv.appendChild(chatDiv);
      
      // Add footer
      const footerDiv = document.createElement('div');
      footerDiv.innerHTML = `
        <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
      `;
      tempDiv.appendChild(footerDiv);
      
      // Add to document temporarily
      document.body.appendChild(tempDiv);
      
      // Generate PDF
      const canvas = await html2canvas(tempDiv, {
        scale: 1.5, // Increased scale for better quality
        useCORS: true,
        logging: false,
        windowWidth: 750,
        windowHeight: tempDiv.offsetHeight
      });
      
      // Remove temporary div
      document.body.removeChild(tempDiv);
      
      // Create PDF with proper dimensions
      const imgWidth = 8.5 - 1; // 8.5" - 1" total margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF({
        orientation: imgHeight > 11 ? 'portrait' : 'portrait',
        unit: 'in',
        format: 'letter'
      });
      
      // Add the canvas as an image
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95),
        'JPEG',
        0.5, // Left margin
        0.5, // Top margin
        imgWidth,
        imgHeight
      );
      
      // If content is longer than one page, add additional pages
      if (imgHeight > 10) { // 11" - 1" total margins
        let remainingHeight = imgHeight - 10;
        let currentPosition = -10;
        
        while (remainingHeight > 0) {
          pdf.addPage();
          pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            0.5,
            currentPosition,
            imgWidth,
            imgHeight
          );
          remainingHeight -= 10;
          currentPosition -= 10;
        }
      }
      
      // Save the PDF
      pdf.save(`sales-conversation-${new Date().toISOString().slice(0, 10)}.pdf`);
      
      // Reset the simulation after successful export
      resetSimulation();
      
      // Navigate back to the simulator home
      navigate('/simulator');
      
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      setExportError('Failed to export conversation. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Export Conversation</h2>
      
      {exportError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {exportError}
        </div>
      )}
      
      <p className="text-gray-600 mb-6 text-center">
        Export the conversation transcript as a PDF for managerial review.
      </p>
      
      <button
        onClick={exportToPDF}
        disabled={isExporting || !chatHistory || chatHistory.length === 0}
        className={`px-6 py-3 rounded-md text-white font-medium ${
          isExporting || !chatHistory || chatHistory.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isExporting ? 'Exporting...' : 'Export as PDF'}
      </button>
      
      {(!chatHistory || chatHistory.length === 0) && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-4">
            No conversation to export.
          </p>
          <button
            onClick={() => navigate('/simulator')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Scenarios
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatExport; 