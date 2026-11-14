import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Checks if Supabase client credentials have been provided in the frontend environment.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-ref.supabase.co' &&
  supabaseAnonKey !== 'your-supabase-anon-public-key-here' &&
  supabaseUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== ''
);

// Use real credentials if configured; otherwise use dummy values to prevent instant runtime crash on load
const clientUrl = isSupabaseConfigured ? supabaseUrl! : 'https://placeholder.supabase.co';
const clientKey = isSupabaseConfigured ? supabaseAnonKey! : 'placeholder-anon-key';

export const supabase: SupabaseClient = createClient(clientUrl, clientKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
