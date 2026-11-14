import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-container shadow-lg flex flex-col items-center max-w-sm w-full text-center">
          {/* Animated Spinner in Teal/Navy */}
          <div className="relative w-12 h-12 mb-4">
            <div className="w-12 h-12 rounded-full border-4 border-surface-container border-t-secondary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-base">lock</span>
            </div>
          </div>
          <h3 className="font-title-md text-primary font-bold mb-1">Verifying Session</h3>
          <p className="text-body-sm text-on-surface-variant">Checking administrative authorization...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated visitors directly to /admin/login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
