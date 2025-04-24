
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efughnabhmwgqiftgigs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdWdobmFiaG13Z3FpZnRnaWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MTU0MjMsImV4cCI6MjA2MTA5MTQyM30.H7HirCrxulLAZjTk1h330_JeSd0ql9wYifgRGpjHI3M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
