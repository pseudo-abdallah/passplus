import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Temporary debug check (masking most of the key for security)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase Error: Missing VITE_ environment variables.");
} else {
  console.log("Supabase Client: Environment variables loaded.");
  console.log("Supabase Client: Key starts with: " + (supabaseAnonKey ? supabaseAnonKey.substring(0, 10) : "empty"));
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
