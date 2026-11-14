import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { siteConfig } from '../data/content';

export const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      navigate('/admin/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between antialiased selection:bg-secondary selection:text-white">
      {/* Admin Header */}
      <header className="w-full bg-surface-container-lowest border-b border-surface-container sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={siteConfig.logoUrl}
              alt={`${siteConfig.businessName} Logo`}
              className="h-8 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-title-md text-sm sm:text-base text-primary font-bold">
                {siteConfig.businessName}
              </span>
              <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider">
                Admin Control Room
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View public website */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-base">public</span>
              <span className="hidden sm:inline">View Website</span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-error hover:bg-error-container/40 py-1.5 px-3.5 rounded-lg border border-error/30 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-error/40 border-t-error animate-spin" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content Body */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-8 py-10 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-surface-container-lowest rounded-3xl border border-surface-container shadow-lg p-6 sm:p-10 text-center relative overflow-hidden">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary-container" />

          {/* Secure Shield Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-secondary-container/40 text-secondary mb-6 shadow-inner">
            <span className="material-symbols-outlined text-3xl">verified_user</span>
          </div>

          {/* Prompt specified heading */}
          <h1 className="font-headline-md text-2xl sm:text-3xl text-primary font-bold tracking-tight mb-3">
            Welcome to Abhishekh Healthcare Consultancy Admin
          </h1>

          <p className="text-body-md text-on-surface-variant max-w-lg mx-auto mb-8">
            You are successfully authenticated. Your session is active and securely persisted.
          </p>

          {/* Session Overview Card */}
          <div className="bg-surface-container-low rounded-2xl border border-surface-container p-5 text-left mb-8 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-surface-container/60 pb-2.5">
              <span className="font-semibold text-on-surface-variant uppercase tracking-wider">
                Authenticated Account
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Active Session
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-base">account_circle</span>
                <span className="font-semibold text-primary">{user?.email || 'Administrator'}</span>
              </div>
              <div className="text-xs text-on-surface-variant">
                UID: <span className="font-mono text-[11px] bg-surface-container px-1.5 py-0.5 rounded">{user?.id ? `${user.id.slice(0, 12)}...` : 'N/A'}</span>
              </div>
            </div>

            {user?.last_sign_in_at && (
              <div className="text-xs text-on-surface-variant/80 pt-1">
                Last sign in:{' '}
                <span className="font-medium text-primary">
                  {new Date(user.last_sign_in_at).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Next Task Notice */}
          <div className="p-4 rounded-xl bg-surface-container/50 border border-surface-container text-xs text-on-surface-variant flex items-center justify-center gap-2 text-center">
            <span className="material-symbols-outlined text-base text-secondary">verified</span>
            <span>Authentication system is operational. Protected routes are secured against unauthorized access.</span>
          </div>
        </div>
      </main>

      {/* Admin Footer */}
      <footer className="w-full py-4 text-center text-xs text-on-surface-variant/80 border-t border-surface-container">
        <p>© {new Date().getFullYear()} {siteConfig.businessName}. Administrative Portal.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
