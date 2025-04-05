import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ContentPage from '../layout/ContentPage';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useContentLoader } from '../../utils/contentLoader';

/**
 * Template for wedding content components
 * @param {Object} props
 * @param {string} props.title - The title of the content
 * @param {React.ReactNode} props.fallbackContent - Fallback content to display if no data is available
 * @param {string} props.contentId - Optional content ID to use instead of deriving from URL
 * @param {string} props.contentType - The type of content (weddings, sales, etc.)
 */
function ContentTemplate({ title, fallbackContent, contentId: propContentId, contentType = 'weddings' }) {
  const { id } = useParams();
  const location = useLocation();
  
  // Determine the content ID from props, URL params, or path
  let contentId = propContentId;
  
  if (!contentId) {
    if (id) {
      contentId = id;
    } else {
      // Extract the last part of the path as the content ID
      const pathParts = location.pathname.split('/');
      contentId = pathParts[pathParts.length - 1];
    }
  }
  
  // If we still don't have a content ID, use the title
  if (!contentId) {
    contentId = title.toLowerCase().replace(/\s+/g, '-');
  }
  
  const { content, loading, error } = useContentLoader(contentType, contentId);
  
  if (loading) {
    return (
      <ContentPage title={title}>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      </ContentPage>
    );
  }
  
  if (error) {
    return (
      <ContentPage title={title}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading content: {error.message}</p>
        </div>
      </ContentPage>
    );
  }
  
  // If content is loaded from Firestore, use it
  if (content) {
    return (
      <ContentPage title={content.title || title}>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
      </ContentPage>
    );
  }
  
  // Fallback content if no data is available
  return (
    <ContentPage title={title}>
      {fallbackContent}
    </ContentPage>
  );
}

export default ContentTemplate; 