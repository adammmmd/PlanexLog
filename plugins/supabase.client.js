// plugins/supabase.js

import { createClient } from '@supabase/supabase-js';

// Gantilah dengan nilai URL dan kunci API Supabase Anda
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhYmNka3h4a290dWFoeXhvZWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4MDAzMDIsImV4cCI6MjAxMTM3NjMwMn0.GaCDrYROM6p7bYa4PYsEPC5VCGKAf7WQw8h99nOKwKA";

const supabaseUrl = "https://aabcdkxxkotuahyxoehv.supabase.co";
const supabaseKey = SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
