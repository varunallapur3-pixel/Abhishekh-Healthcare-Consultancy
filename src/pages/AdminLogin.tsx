import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { siteConfig } from '../data/content';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, resetPassword, isConfigured } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password reset mode
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  // If already logged in, redirect to intended target or /admin
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your administrator email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn(email, password, rememberMe);
      if (error) {
        setErrorMessage(error.message || 'Invalid administrator credentials. Access restricted.');
      } else {
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    setResetSuccess(null);

    if (!resetEmail.trim()) {
      setResetError('Please enter your registered administrator email address.');
      return;
    }

    setResetSubmitting(true);
    try {
      const { error } = await resetPassword(resetEmail);
      if (error) {
        setResetError(error.message);
      } else {
        setResetSuccess(
          `Password reset instructions have been dispatched to ${resetEmail}. Please check your inbox.`
        );
      }
    } catch (err: any) {
      setResetError(err.message || 'Failed to dispatch password reset email.');
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between antialiased selection:bg-secondary selection:text-white">
      {/* Top minimal header */}
      <header className="w-full bg-surface-container-lowest/80 backdrop-blur-md border-b border-surface-container py-3 px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={siteConfig.logoUrl}
              alt={`${siteConfig.businessName} Logo`}
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-title-md text-sm sm:text-base text-primary font-bold">
                {siteConfig.businessName}
              </span>
              <span className="text-[10px] text-on-surface-variant tracking-wider uppercase hidden sm:inline">
                Administrative Gateway
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-secondary hover:text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Login Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-surface-container shadow-xl p-6 sm:p-9 relative overflow-hidden">
          {/* Subtle top brand accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary-container" />

          {/* Configuration Banner if Supabase keys missing */}
          {!isConfigured && (
            <div className="mb-6 p-4 rounded-xl bg-surface-container border border-outline-variant text-primary text-xs leading-relaxed flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-lg shrink-0 mt-0.5">info</span>
              <div>
                <p className="font-bold text-primary mb-1">Supabase Credentials Notice</p>
                <p className="text-on-surface-variant">
                  Frontend environment variables (<code className="bg-surface-container-highest px-1 py-0.5 rounded text-[11px]">VITE_SUPABASE_URL</code> and <code className="bg-surface-container-highest px-1 py-0.5 rounded text-[11px]">VITE_SUPABASE_ANON_KEY</code>) are not yet populated in <code className="bg-surface-container-highest px-1 py-0.5 rounded text-[11px]">.env</code>.
                </p>
              </div>
            </div>
          )}

          {!isResetMode ? (
            /* Standard Admin Login Form */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-surface-container text-secondary mb-3 shadow-inner">
                  <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                </div>
                <h1 className="font-headline-sm text-xl sm:text-2xl text-primary font-bold tracking-tight">
                  Admin Portal Login
                </h1>
                <p className="text-body-sm text-on-surface-variant mt-1.5">
                  Authorized healthcare administrative personnel only
                </p>
              </div>

              {/* Error feedback banner */}
              {errorMessage && (
                <div className="mb-6 p-3.5 rounded-xl bg-error-container/40 border border-error/30 text-error flex items-start gap-2.5 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">error</span>
                  <div className="text-xs font-medium leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* Success feedback banner */}
              {successMessage && (
                <div className="mb-6 p-3.5 rounded-xl bg-secondary-container/30 border border-secondary/30 text-primary flex items-start gap-2.5 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-lg text-secondary shrink-0 mt-0.5">check_circle</span>
                  <div className="text-xs font-medium leading-relaxed">{successMessage}</div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">mail</span>
                    </span>
                    <input
                      id="admin-email"
                      type="email"
                      required
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@abhishekhhealth.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-container-low border border-surface-container rounded-xl text-primary placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
                    />
                  </div>
                </div>

                {/* Password with Show/Hide Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-semibold text-primary uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsResetMode(true);
                        setResetEmail(email);
                        setErrorMessage(null);
                      }}
                      className="text-xs font-medium text-secondary hover:text-primary transition-colors focus:outline-none"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">lock</span>
                    </span>
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-11 py-2.5 text-sm bg-surface-container-low border border-surface-container rounded-xl text-primary placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me Option */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary accent-secondary cursor-pointer"
                    />
                    <span className="text-xs text-on-surface-variant font-medium">
                      Remember this session
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-150 shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Secure Administrator Login</span>
                      <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">
                        login
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Administrative Restriction Notice - Strictly NO public registration */}
              <div className="mt-8 pt-5 border-t border-surface-container text-center">
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Notice: Public self-registration is strictly disabled. Administrative accounts are provisioned exclusively through authorized channels.
                </p>
              </div>
            </>
          ) : (
            /* Forgot Password Flow */
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-surface-container text-secondary mb-3 shadow-inner">
                  <span className="material-symbols-outlined text-2xl">lock_reset</span>
                </div>
                <h1 className="font-headline-sm text-xl sm:text-2xl text-primary font-bold tracking-tight">
                  Reset Password
                </h1>
                <p className="text-body-sm text-on-surface-variant mt-1.5">
                  Enter your registered administrator email to receive reset instructions
                </p>
              </div>

              {/* Reset Error */}
              {resetError && (
                <div className="mb-5 p-3.5 rounded-xl bg-error-container/40 border border-error/30 text-error flex items-start gap-2.5 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">error</span>
                  <div className="text-xs font-medium leading-relaxed">{resetError}</div>
                </div>
              )}

              {/* Reset Success */}
              {resetSuccess ? (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="p-4 rounded-xl bg-secondary-container/30 border border-secondary/30 text-primary flex items-start gap-3">
                    <span className="material-symbols-outlined text-xl text-secondary shrink-0 mt-0.5">mark_email_read</span>
                    <div className="text-xs font-medium leading-relaxed">{resetSuccess}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(false);
                      setResetSuccess(null);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label
                      htmlFor="reset-email"
                      className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2"
                    >
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                        <span className="material-symbols-outlined text-lg">mail</span>
                      </span>
                      <input
                        id="reset-email"
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="admin@abhishekhhealth.com"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-container-low border border-surface-container rounded-xl text-primary placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resetSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container focus:outline-none transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {resetSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Sending Instructions...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Password Reset Link</span>
                        <span className="material-symbols-outlined text-base">send</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(false);
                      setResetError(null);
                    }}
                    className="w-full py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Back to Login</span>
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer minimal notice */}
      <footer className="w-full py-4 text-center text-xs text-on-surface-variant/80 border-t border-surface-container">
        <p>© {new Date().getFullYear()} {siteConfig.businessName}. Secure Administrative Access.</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
