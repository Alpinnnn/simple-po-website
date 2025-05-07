'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/app/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { Profile } from '@/app/utils/supabase-types';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signingOut: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signingOut: false,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
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
      // First get and check if we have a session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession) {
        setUser(null);
        setProfile(null);
        setSession(null);
        return;
      }
      
      // Get user data
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setSession(currentSession);
      
      if (data.user) {
        const profileData = await fetchProfile(data.user.id);
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setProfile(null);
      setSession(null);
    }
  };

  const signOut = async () => {
    // If already signing out, prevent multiple sign out attempts
    if (signingOut) return;
    
    try {
      setSigningOut(true);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      // Clear user data
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Force a redirect to login page after successful signout
      // This ensures a full page reload and prevents infinite loading
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
      setSigningOut(false); // Reset signing out state on error
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Check current session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        
        if (currentSession) {
          const { data } = await supabase.auth.getUser();
          setUser(data.user);
          
          if (data.user) {
            const profileData = await fetchProfile(data.user.id);
            setProfile(profileData);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setProfile(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
      
      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
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
    <AuthContext.Provider value={{ user, profile, loading, signingOut, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
} 