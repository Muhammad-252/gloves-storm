"use client";

import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../supabase/client";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage fallback first
    const localAuth = localStorage.getItem("gs_admin_session");
    if (localAuth === "true") {
      setIsAuthenticated(true);
      setUserEmail(localStorage.getItem("gs_admin_email") || "admin@glovesstorm.com");
      return;
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || null);
        } else {
          setIsAuthenticated(false);
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || null);
        } else {
          setIsAuthenticated(false);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      setIsAuthenticated(true);
      setUserEmail(data.user.email || email);
      return { success: true };
    }

    // Fallback demo authentication for instant local access
    localStorage.setItem("gs_admin_session", "true");
    localStorage.setItem("gs_admin_email", email);
    setIsAuthenticated(true);
    setUserEmail(email);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("gs_admin_session");
    localStorage.removeItem("gs_admin_email");
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return {
    isAuthenticated,
    userEmail,
    login,
    logout,
  };
}
