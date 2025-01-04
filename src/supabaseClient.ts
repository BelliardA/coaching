import { createClient } from "@supabase/supabase-js";

// Remplacez par vos clés API et URL de Supabase
const supabaseUrl = import.meta.env.supabaseUrl;
const supabaseKey = import.meta.env.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);