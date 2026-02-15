import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://viymdriindwhfqslgnfx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_WQdWoQKwDnf7Km6pXmCWRw_-C_Y5ueq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
