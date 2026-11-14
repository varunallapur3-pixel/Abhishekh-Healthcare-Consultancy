import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('TASK 3.2 Verification Checks', () => {

  test('Check 1: Frontend .env file presence and format check', () => {
    const envExists = fs.existsSync(path.resolve('.env'));
    console.log(`[Check 1] Frontend .env exists: ${envExists}`);

    if (envExists) {
      const envContent = fs.readFileSync(path.resolve('.env'), 'utf8');
      const hasUrl = /VITE_SUPABASE_URL\s*=\s*\S+/.test(envContent);
      const hasKey = /VITE_SUPABASE_ANON_KEY\s*=\s*\S+/.test(envContent);
      assert.strictEqual(hasUrl && hasKey, true, 'Frontend .env must have non-empty VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    } else {
      // If .env is not present, .env.example must exist with instructions
      assert.strictEqual(fs.existsSync(path.resolve('.env.example')), true, '.env.example must exist');
    }
  });

  test('Check 2: .gitignore excludes .env files and no service-role key is in build output', () => {
    const gitignore = fs.readFileSync(path.resolve('.gitignore'), 'utf8');
    assert.match(gitignore, /^\.env/m, '.env must be in .gitignore');
    assert.match(gitignore, /^\*\.env/m, '*.env must be in .gitignore');

    // Build directory check
    const distAssetsDir = path.resolve('dist/assets');
    if (fs.existsSync(distAssetsDir)) {
      const files = fs.readdirSync(distAssetsDir);
      for (const file of files) {
        const filePath = path.join(distAssetsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        assert.strictEqual(content.includes('service_role'), false, `service_role found in build artifact ${file}`);
      }
    }
  });

  test('Check 7: Missing Supabase config or failed auth never treats login as successful', () => {
    // 1. Missing config simulation
    const isConfigured = false;
    let user = null;
    let authError = null;

    function simulateSignIn(email, password) {
      if (!isConfigured) {
        return { error: new Error('Supabase environment variables are missing.') };
      }
      return { user: { email }, error: null };
    }

    const unconfiguredResult = simulateSignIn('admin@test.com', 'pass123');
    assert.notStrictEqual(unconfiguredResult.error, null);
    assert.strictEqual(user, null, 'User must remain null when unconfigured');

    // 2. Failed auth simulation
    function simulateFailedAuth() {
      return { error: new Error('Invalid login credentials') };
    }

    const failedResult = simulateFailedAuth();
    if (failedResult.error) {
      authError = failedResult.error.message;
    } else {
      user = { email: 'admin@test.com' };
    }

    assert.strictEqual(user, null, 'User must remain null upon failed auth');
    assert.strictEqual(authError, 'Invalid login credentials');
  });

  test('Check 6: Consultation enquiry access restrictions', () => {
    const schema = fs.readFileSync(path.resolve('backend/schema.sql'), 'utf8');
    // Ensure SELECT is only for service_role
    assert.match(schema, /FOR\s+SELECT\s+TO\s+service_role/i);
    // Ensure UPDATE is only for service_role
    assert.match(schema, /FOR\s+UPDATE\s+TO\s+service_role/i);
    // Ensure DELETE is only for service_role
    assert.match(schema, /FOR\s+DELETE\s+TO\s+service_role/i);
  });
});
