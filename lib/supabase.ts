import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export type UserRole = {
  id: string;
  user_id: string;
  role: 'user' | 'admin';
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  photo_url: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
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
