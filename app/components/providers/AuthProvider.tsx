'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/app/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Profile } from '@/app/utils/supabase-types';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabaseClient();

  const fetchProfile = async (userId: string) => {
    try {
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
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  const refreshUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      
      if (data.user) {
        const profileData = await fetchProfile(data.user.id);
        setProfile(profileData);
      }
    } catch (error) {
      setUser(null);
      setProfile(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Check current session
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        
        if (data.user) {
          const profileData = await fetchProfile(data.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
      
      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user || null);
          
          if (session?.user) {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
          } else {
            setProfile(null);
          }
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
} 