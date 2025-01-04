import { createClient } from "@supabase/supabase-js";

// Remplacez par vos clés API et URL de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;


export const supabase = createClient(supabaseUrl, supabaseKey);