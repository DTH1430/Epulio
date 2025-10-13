import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a function to get the Supabase client
function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-') || supabaseAnonKey.includes('your-')) {
    throw new Error('Supabase environment variables are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export type Profile = {
  id: string;
  name: string;
  bio: string;
  photo_url: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  projects?: {
    title: string;
    description: string;
    url?: string;
    image?: string;
  }[];
  created_at: string;
  updated_at: string;
};
