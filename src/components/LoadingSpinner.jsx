import React from 'react';

const LoadingSpinner = ({ small = false }) => {
  const size = small ? 'h-8 w-8' : 'h-12 w-12';
  
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${size} border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin`}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;