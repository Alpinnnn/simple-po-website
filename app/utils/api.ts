import { createServerClient } from '@/app/lib/supabase';
import { Canteen, Food, Profile } from './supabase-types';

export async function getCanteens(): Promise<Canteen[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('canteens')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching canteens:', error);
    return [];
  }
  
  return data as Canteen[];
}

export async function getCanteenById(id: string): Promise<Canteen | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('canteens')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching canteen:', error);
    return null;
  }
  
  return data as Canteen;
}

export async function getFoodsByCanteen(canteenId: string): Promise<Food[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('canteen_id', canteenId)
    .order('name');
    
  if (error) {
    console.error('Error fetching foods:', error);
    return [];
  }
  
  return data as Food[];
}

export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data as Profile;
} 