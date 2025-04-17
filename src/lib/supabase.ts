import { createClient } from '@supabase/supabase-js';

// Initialiser Supabase avec les variables d'environnement
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY || '';

// Vérifier que les clés sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 