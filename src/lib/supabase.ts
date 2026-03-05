import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabaseInstance: SupabaseClient | null = null;

export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured');
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
})();

let serviceSupabaseInstance: SupabaseClient | null = null;

export const getServiceSupabase = (): SupabaseClient | null => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('Supabase service credentials not configured');
    return null;
  }
  
  if (!serviceSupabaseInstance) {
    serviceSupabaseInstance = createClient(supabaseUrl, serviceRoleKey);
  }
  return serviceSupabaseInstance;
};
