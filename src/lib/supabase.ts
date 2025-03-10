
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjduohtvejdkhfytdlll.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZHVvaHR2ZWpka2hmeXRkbGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1ODI4NDUsImV4cCI6MjA1NzE1ODg0NX0.NOZTsfvF1yjUFg_YOIIvuAxJelyRKyp49ZHZQsvO54U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
