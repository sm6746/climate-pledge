import { createClient } from '@supabase/supabase-js'

// Read Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL. Add it to your .env.local file.')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY. Add it to your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// If you plan to generate typed Database definitions, you can import them here
// and pass as a generic to createClient, e.g. createClient<Database>(...)

