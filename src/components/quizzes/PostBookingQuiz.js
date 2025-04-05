import React from 'react';

function PostBookingQuiz() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-gilda text-darkBrown mb-8 text-center">Post-Booking Quiz</h1>
      <div className="w-full max-w-4xl mx-auto">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXX/viewform?embedded=true"
          width="100%"
          height="800px"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Post-Booking Quiz"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

export default PostBookingQuiz; 