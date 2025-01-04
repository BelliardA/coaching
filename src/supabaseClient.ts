import { createClient } from "@supabase/supabase-js";

// Remplacez par vos clés API et URL de Supabase
const supabaseUrl = "https://dgrqjfyxzcmszhbdwfoq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRncnFqZnl4emNtc3poYmR3Zm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNzMwMTQsImV4cCI6MjA0OTc0OTAxNH0.aFr_RhbYgTbv18hHNN5c3cH5cpxTLxtqblTnukO_ktI";

export const supabase = createClient(supabaseUrl, supabaseKey);