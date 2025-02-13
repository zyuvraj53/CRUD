import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sqsuzpsypyiayprxttnr.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxc3V6cHN5cHlpYXlwcnh0dG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0Nzk3MDQsImV4cCI6MjA1NTA1NTcwNH0.uSt2KJJ3Q7f9CPjVNZ-MouOvPdPKQLXrF59mTDjHi2Q"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase