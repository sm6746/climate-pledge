export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pledges: {
        Row: {
          id: string
          pledge_number: number
          name: string
          email: string
          mobile: string
          state: string
          profile_type: 'Student' | 'Working Professional' | 'Other'
          commitments: Json
          commitment_count: number
          hearts_rating: number
          created_at: string
        }
        Insert: {
          id?: string
          pledge_number?: number
          name: string
          email: string
          mobile: string
          state: string
          profile_type: 'Student' | 'Working Professional' | 'Other'
          commitments?: Json
          commitment_count?: number
          hearts_rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          pledge_number?: number
          name?: string
          email?: string
          mobile?: string
          state?: string
          profile_type?: 'Student' | 'Working Professional' | 'Other'
          commitments?: Json
          commitment_count?: number
          hearts_rating?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}