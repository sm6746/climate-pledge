import { supabase } from './supabaseClient';
import type { Database } from './database.types';

type Pledge = Database['public']['Tables']['pledges']['Insert'];

export async function createPledge(data: {
  name: string;
  email: string;
  mobile: string;
  state: string;
  profileType: 'Student' | 'Working Professional' | 'Other';
  commitments: string[];
}) {
  const pledge: Pledge = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    state: data.state,
    profile_type: data.profileType,
    commitments: data.commitments,
    commitment_count: data.commitments.length,
    hearts_rating: Math.min(5, Math.ceil(data.commitments.length / 2))
  };

  const { data: result, error } = await supabase
    .from('pledges')
    .insert(pledge)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getPledges() {
  const { data, error } = await supabase
    .from('pledges')
    .select('id, pledge_number, name, state, profile_type, commitment_count, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(pledge => ({
    id: pledge.pledge_number.toString(),
    name: pledge.name,
    date: new Date(pledge.created_at).toLocaleDateString(),
    state: pledge.state,
    profileType: pledge.profile_type,
    commitmentCount: pledge.commitment_count
  }));
}