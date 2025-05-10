import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 h-[80vh] flex flex-col items-center justify-center text-center">
      <Film className="h-20 w-20 text-primary-500 mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary inline-flex items-center">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;