import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ecksnjcoeurxhjbiubng.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVja3NuamNvZXVyeGhqYml1Ym5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NDQyMTIsImV4cCI6MjA4MzUyMDIxMn0.tSoGJSS6N1Sgqx2EnpZYhaMcVCeH9rITQ5I7fJM32ps";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);


