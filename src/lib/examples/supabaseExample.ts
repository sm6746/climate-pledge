import { supabase } from '@/lib/supabaseClient'

type ProfileType = 'Student' | 'Working Professional' | 'Other'

export type PublicPledge = {
  id: string
  pledge_number: number
  name: string
  state: string
  profile_type: ProfileType
  commitments: unknown[]
  commitment_count: number
  hearts_rating: number
  created_at: string
}

export async function fetchPledges() {
  // Important: we intentionally do not select email/mobile in public queries
  const { data, error } = await supabase
    .from('pledges')
    .select(
      'id, pledge_number, name, state, profile_type, commitments, commitment_count, hearts_rating, created_at'
    )
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as PublicPledge[]
}

export type NewPledgeInput = {
  name: string
  email: string
  mobile: string
  state: string
  profile_type: ProfileType
  commitments: unknown[]
}

function calculateHeartsRating(commitmentCount: number): number {
  if (commitmentCount >= 7) return 5
  if (commitmentCount >= 4) return 4
  if (commitmentCount >= 1) return 3
  return 3
}

export async function insertPledge(values: NewPledgeInput) {
  const commitmentCount = Array.isArray(values.commitments) ? values.commitments.length : 0
  const heartsRating = calculateHeartsRating(commitmentCount)

  const payload = {
    name: values.name,
    email: values.email,
    mobile: values.mobile,
    state: values.state,
    profile_type: values.profile_type,
    commitments: values.commitments,
    commitment_count: commitmentCount,
    hearts_rating: heartsRating,
  }

  const { data, error } = await supabase
    .from('pledges')
    .insert(payload)
    .select('id, pledge_number, created_at')
    .single()

  if (error) throw error
  return data as { id: string; pledge_number: number; created_at: string }
}

