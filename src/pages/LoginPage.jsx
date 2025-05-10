import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Film, User, Lock, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    // Form validation
    if (!username.trim() || !password.trim()) {
      setFormError('Username and password are required');
      return;
    }
    
    // Attempt login
    const success = login(username, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white dark:bg-dark-100 rounded-lg shadow-card w-full max-w-md">
        <div className="pt-8 pb-2 px-8 text-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <Film className="h-12 w-12 text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold mt-4 mb-2">Welcome to MovieHub</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access your favorite movies</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          {/* Demo credentials notice */}
          <div className="bg-gray-100 dark:bg-dark-200 p-3 rounded-lg mb-6 text-sm">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Username: <span className="font-mono bg-gray-200 dark:bg-dark-300 px-1 py-0.5 rounded">user</span> | Password: <span className="font-mono bg-gray-200 dark:bg-dark-300 px-1 py-0.5 rounded">password</span></p>
          </div>
          
          {/* Username field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          {/* Password field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          {/* Error message */}
          {(formError || error) && (
            <div className="mb-4 p-3 rounded bg-error-500/10 text-error-500 text-sm">
              {formError || error}
            </div>
          )}
          
          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;