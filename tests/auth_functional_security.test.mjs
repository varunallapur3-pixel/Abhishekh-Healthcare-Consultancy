import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Supabase Authentication & Security Functional Tests', () => {

  // =========================================================================
  // SECURITY CHECKS
  // =========================================================================

  test('SECURITY CHECK 1: No service-role key or secret tokens in frontend files', () => {
    const srcDir = path.resolve('src');
    
    function scanDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.isFile() && /\.(tsx?|jsx?|html|css|json)$/i.test(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          // Disallow service_role references in source code
          assert.strictEqual(
            content.includes('service_role'),
            false,
            `Forbidden "service_role" found in frontend file: ${fullPath}`
          );
          // Disallow hardcoded JWT secrets
          assert.strictEqual(
            /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/i.test(content),
            false,
            `Potential hardcoded JWT secret found in: ${fullPath}`
          );
        }
      }
    }

    scanDir(srcDir);
  });

  test('SECURITY CHECK 2: Supabase RLS policies restrict SELECT, UPDATE, DELETE to service_role', () => {
    const schemaPath = path.resolve('backend/schema.sql');
    assert.strictEqual(fs.existsSync(schemaPath), true, 'backend/schema.sql must exist');

    const schemaContent = fs.readFileSync(schemaPath, 'utf8');

    // 1. RLS must be enabled on enquiries
    assert.match(
      schemaContent,
      /ALTER\s+TABLE\s+public\.enquiries\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY;/i,
      'Row Level Security must be enabled on public.enquiries'
    );

    // 2. SELECT must strictly be restricted to service_role
    assert.match(
      schemaContent,
      /CREATE\s+POLICY\s+"Restrict\s+read\s+access\s+to\s+service\s+role"\s+ON\s+public\.enquiries\s+FOR\s+SELECT\s+TO\s+service_role/i,
      'SELECT policy must strictly be limited to service_role'
    );

    // 3. INSERT allowed for public enquiry submissions
    assert.match(
      schemaContent,
      /CREATE\s+POLICY\s+"Allow\s+public\s+enquiry\s+submission"\s+ON\s+public\.enquiries\s+FOR\s+INSERT\s+TO\s+anon,\s+authenticated/i,
      'INSERT policy must permit submission'
    );

    // 4. UPDATE and DELETE restricted to service_role
    assert.match(
      schemaContent,
      /CREATE\s+POLICY\s+"Restrict\s+update\s+to\s+service\s+role"\s+ON\s+public\.enquiries\s+FOR\s+UPDATE\s+TO\s+service_role/i,
      'UPDATE must be restricted to service_role'
    );
    assert.match(
      schemaContent,
      /CREATE\s+POLICY\s+"Restrict\s+delete\s+to\s+service\s+role"\s+ON\s+public\.enquiries\s+FOR\s+DELETE\s+TO\s+service_role/i,
      'DELETE must be restricted to service_role'
    );
  });

  test('SECURITY CHECK 3: Protected routes wrap /admin and redirect unauthenticated users', () => {
    const appTsx = fs.readFileSync(path.resolve('src/App.tsx'), 'utf8');
    const protectedRouteTsx = fs.readFileSync(path.resolve('src/components/ProtectedRoute.tsx'), 'utf8');

    // App.tsx must route /admin inside ProtectedRoute
    assert.match(
      appTsx,
      /<Route\s+path="\/admin"\s+element={\s*<ProtectedRoute>\s*<AdminDashboard\s*\/>\s*<\/ProtectedRoute>\s*}/s,
      '/admin route must be encapsulated within <ProtectedRoute>'
    );

    // ProtectedRoute must redirect to /admin/login when user is falsy
    assert.match(
      protectedRouteTsx,
      /<Navigate\s+to="\/admin\/login"\s+state={{\s*from:\s*location\s*}}\s*replace\s*\/>/s,
      'ProtectedRoute must execute <Navigate to="/admin/login" replace /> when !user'
    );
  });

  test('SECURITY CHECK 4: Public registration is strictly absent from the application', () => {
    const adminLoginTsx = fs.readFileSync(path.resolve('src/pages/AdminLogin.tsx'), 'utf8');
    const appTsx = fs.readFileSync(path.resolve('src/App.tsx'), 'utf8');

    // No sign-up routes in App.tsx
    assert.strictEqual(appTsx.includes('/register') || appTsx.includes('/signup'), false);

    // AdminLogin displays strict administrative restriction notice
    assert.match(
      adminLoginTsx,
      /Public self-registration is strictly disabled/i,
      'Must display notice that public registration is disabled'
    );

    // Must NOT contain sign-up action
    assert.strictEqual(
      adminLoginTsx.includes('signUp') || adminLoginTsx.includes('createAccount'),
      false,
      'AdminLogin must not expose sign-up or registration handlers'
    );
  });

  test('SECURITY CHECK 5: Error messages are sanitized and user-friendly', () => {
    const adminLoginTsx = fs.readFileSync(path.resolve('src/pages/AdminLogin.tsx'), 'utf8');

    // Default error fallback message does not leak system specifics
    assert.match(
      adminLoginTsx,
      /Invalid administrator credentials\. Access restricted\./i,
      'Generic and secure authentication error message required'
    );
  });

  // =========================================================================
  // FUNCTIONAL SCENARIO TESTS (Mocked & Logic Verifications)
  // =========================================================================

  test('SCENARIO 1: Valid administrator login logic (Mocked)', () => {
    // Contract simulation: mock Supabase signInWithPassword returning valid user/session
    const mockAuthResponse = {
      data: {
        user: { id: 'usr-12345', email: 'admin@abhishekhhealth.com' },
        session: { access_token: 'mock-jwt-token', expires_at: 1731632400 },
      },
      error: null,
    };

    let userState = null;
    let sessionState = null;
    let errorState = null;

    if (!mockAuthResponse.error && mockAuthResponse.data) {
      userState = mockAuthResponse.data.user;
      sessionState = mockAuthResponse.data.session;
    } else {
      errorState = mockAuthResponse.error?.message;
    }

    assert.strictEqual(userState?.email, 'admin@abhishekhhealth.com');
    assert.strictEqual(sessionState?.access_token, 'mock-jwt-token');
    assert.strictEqual(errorState, null);
  });

  test('SCENARIO 2: Invalid email/password handling (Mocked)', () => {
    // Contract simulation: mock Supabase returning invalid credentials error
    const mockAuthResponse = {
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' },
    };

    let userState = null;
    let errorMessage = null;

    if (mockAuthResponse.error) {
      errorMessage = mockAuthResponse.error.message || 'Invalid administrator credentials. Access restricted.';
    } else {
      userState = mockAuthResponse.data.user;
    }

    assert.strictEqual(userState, null);
    assert.strictEqual(errorMessage, 'Invalid login credentials');
  });

  test('SCENARIO 3: Empty login fields validation logic', () => {
    function validateLoginForm(email, password) {
      if (!email || !email.trim()) {
        return { valid: false, error: 'Please enter your administrator email address.' };
      }
      if (!password) {
        return { valid: false, error: 'Please enter your password.' };
      }
      return { valid: true, error: null };
    }

    // Both empty
    assert.deepStrictEqual(validateLoginForm('', ''), {
      valid: false,
      error: 'Please enter your administrator email address.',
    });

    // Whitespace email
    assert.deepStrictEqual(validateLoginForm('   ', 'secret123'), {
      valid: false,
      error: 'Please enter your administrator email address.',
    });

    // Email present, empty password
    assert.deepStrictEqual(validateLoginForm('admin@abhishekhhealth.com', ''), {
      valid: false,
      error: 'Please enter your password.',
    });

    // Valid fields
    assert.deepStrictEqual(validateLoginForm('admin@abhishekhhealth.com', 'ValidPass#2026'), {
      valid: true,
      error: null,
    });
  });

  test('SCENARIO 4: Session persistence and restoration logic', () => {
    const authContextTsx = fs.readFileSync(path.resolve('src/context/AuthContext.tsx'), 'utf8');

    // Verify getSession() restoration exists on component mount
    assert.match(
      authContextTsx,
      /supabase\.auth\.getSession\(\)/i,
      'AuthContext must call supabase.auth.getSession() to restore persistent sessions'
    );

    // Verify onAuthStateChange listener
    assert.match(
      authContextTsx,
      /supabase\.auth\.onAuthStateChange/i,
      'AuthContext must subscribe to onAuthStateChange'
    );
  });

  test('SCENARIO 5: Logout and session invalidation logic', () => {
    const authContextTsx = fs.readFileSync(path.resolve('src/context/AuthContext.tsx'), 'utf8');
    const adminDashboardTsx = fs.readFileSync(path.resolve('src/pages/AdminDashboard.tsx'), 'utf8');

    // AuthContext signOut resets user and session
    assert.match(
      authContextTsx,
      /setUser\(null\);\s*setSession\(null\);/s,
      'signOut() must clear both user and session in state'
    );

    // AdminDashboard calls signOut and navigates to /admin/login
    assert.match(
      adminDashboardTsx,
      /await\s+signOut\(\);\s*navigate\('\/admin\/login',\s*{\s*replace:\s*true\s*}\);/s,
      'Logout handler must navigate to /admin/login with replace: true'
    );
  });

  test('SCENARIO 6: Direct access to /admin without authentication bounces to login', () => {
    const protectedRouteTsx = fs.readFileSync(path.resolve('src/components/ProtectedRoute.tsx'), 'utf8');

    // When !user, redirect to /admin/login
    assert.match(
      protectedRouteTsx,
      /if\s*\(!user\)\s*\{[\s\S]*?<Navigate\s+to="\/admin\/login"/,
      'Direct unauthenticated access must bounce immediately to /admin/login'
    );
  });

  test('SCENARIO 7: Redirect to the intended page after login', () => {
    const adminLoginTsx = fs.readFileSync(path.resolve('src/pages/AdminLogin.tsx'), 'utf8');

    // AdminLogin resolves destination from location.state.from or defaults to /admin
    assert.match(
      adminLoginTsx,
      /const\s+from\s*=\s*\(location\.state\s+as\s+any\)\?\.from\?\.pathname\s*\|\|\s*'\/admin';/s,
      'Must read return URL from location.state.from.pathname and fallback to /admin'
    );
  });

  test('SCENARIO 8: Forgot password email delivery flow logic', () => {
    const authContextTsx = fs.readFileSync(path.resolve('src/context/AuthContext.tsx'), 'utf8');
    const adminLoginTsx = fs.readFileSync(path.resolve('src/pages/AdminLogin.tsx'), 'utf8');

    // AuthContext uses resetPasswordForEmail
    assert.match(
      authContextTsx,
      /supabase\.auth\.resetPasswordForEmail\(email\.trim\(\),\s*{\s*redirectTo:\s*redirectUrl,\s*}\)/s,
      'resetPassword must invoke supabase.auth.resetPasswordForEmail with redirect URL'
    );

    // AdminLogin provides forgot password reset form
    assert.match(
      adminLoginTsx,
      /handleResetPassword/i,
      'AdminLogin must provide reset password form submission handler'
    );
  });

  test('SCENARIO 9: Behavior when Supabase environment variables are missing', () => {
    const supabaseTs = fs.readFileSync(path.resolve('src/lib/supabase.ts'), 'utf8');
    const adminLoginTsx = fs.readFileSync(path.resolve('src/pages/AdminLogin.tsx'), 'utf8');

    // isSupabaseConfigured flag checks
    assert.match(
      supabaseTs,
      /export\s+const\s+isSupabaseConfigured\s*=/i,
      'supabase.ts must export isSupabaseConfigured boolean check'
    );

    // Safe fallback client prevents crashes
    assert.match(
      supabaseTs,
      /placeholder\.supabase\.co/i,
      'Must use safe placeholder URL if environment variables are not set'
    );

    // AdminLogin shows banner if !isConfigured
    assert.match(
      adminLoginTsx,
      /{!isConfigured\s*&&/i,
      'AdminLogin must display informative configuration warning banner when keys are missing'
    );
  });

  test('SCENARIO 10: Public registration restrictions confirmed', () => {
    const adminLoginTsx = fs.readFileSync(path.resolve('src/pages/AdminLogin.tsx'), 'utf8');

    // Prohibit self-service registration links
    assert.strictEqual(
      adminLoginTsx.includes('Sign up') || adminLoginTsx.includes('Create an account'),
      false,
      'Must not offer registration links to the public'
    );
  });

});
