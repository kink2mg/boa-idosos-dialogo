import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://voydrglwkrqasrlzqnmk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZveWRyZ2x3a3JxYXNybHpxbm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODE4NDksImV4cCI6MjA1NDI1Nzg0OX0.mYBORyLb6diHJoiAAON3io0gz2IjILBxxDdDpjQLoMU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);