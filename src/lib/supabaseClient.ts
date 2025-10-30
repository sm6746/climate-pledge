import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Read Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL. Add it to your .env.local file.')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY. Add it to your .env.local file.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

