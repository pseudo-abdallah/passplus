import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Temporary debug check for environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase Error: Missing VITE_ environment variables in production build.");
} else {
  console.log("Supabase Client: Environment variables loaded.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
