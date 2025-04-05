import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function ContentPage({ title, content, previousPage, nextPage, quizLink }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/welcome" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link to="/weddings" className="hover:text-gray-700">Weddings</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-700">{title}</li>
        </ol>
      </nav>

      {/* Main Content */}
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

      {/* Navigation Footer */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          {previousPage && (
            <Link
              to={previousPage.path}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← {previousPage.title}
            </Link>
          )}
          <div className="flex-1"></div>
          {nextPage && (
            <Link
              to={nextPage.path}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {nextPage.title} →
            </Link>
          )}
        </div>
      </div>

      {/* Quiz Link */}
      {quizLink && (
        <div className="mt-8 text-center">
          <Link
            to={quizLink}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Take the Quiz
          </Link>
        </div>
      )}
    </div>
  );
}

export default ContentPage; 