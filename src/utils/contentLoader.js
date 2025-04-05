import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Loads content from Firestore based on the content type and ID
 * @param {string} contentType - The type of content (e.g., 'weddings', 'sales')
 * @param {string} contentId - The specific content ID to load
 * @returns {Promise<Object>} - The loaded content or null if not found
 */
export const loadContent = async (contentType, contentId) => {
  try {
    // Create a valid document reference with an even number of segments
    const contentRef = doc(db, 'content', `${contentType}-${contentId}`);
    const contentDoc = await getDoc(contentRef);
    
    if (contentDoc.exists()) {
      return {
        id: contentDoc.id,
        ...contentDoc.data()
      };
    } else {
      console.warn(`Content not found: ${contentType}-${contentId}`);
      return null;
    }
  } catch (error) {
    console.error('Error loading content:', error);
    throw error;
  }
};

/**
 * Loads multiple content items from Firestore
 * @param {string} contentType - The type of content (e.g., 'weddings', 'sales')
 * @param {Array<string>} contentIds - Array of content IDs to load
 * @returns {Promise<Array<Object>>} - Array of loaded content items
 */
export const loadMultipleContent = async (contentType, contentIds) => {
  try {
    const contentPromises = contentIds.map(id => loadContent(contentType, id));
    return await Promise.all(contentPromises);
  } catch (error) {
    console.error('Error loading multiple content items:', error);
    throw error;
  }
};

/**
 * Custom hook for loading content with loading and error states
 * @param {string} contentType - The type of content
 * @param {string} contentId - The specific content ID
 * @returns {Object} - Object containing content, loading state, and error
 */
export const useContentLoader = (contentType, contentId) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await loadContent(contentType, contentId);
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (contentType && contentId) {
      fetchContent();
    }
  }, [contentType, contentId]);
  
  return { content, loading, error };
}; 