import { createClient } from '@supabase/supabase-js';

// Clean the URL by removing trailing slashes or extra /waitlist paths if they exist
const rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseUrl = rawUrl.split('/rest/v1')[0].split('/waitlist')[0].replace(/\/+$/, "");

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
