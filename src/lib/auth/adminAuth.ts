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

  const resetPassword = async (
    email: string
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/admin` : undefined,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        return {
          success: true,
          message:
            "Password recovery instructions have been sent to your email address. Please check your inbox or spam folder.",
        };
      } catch (err: any) {
        return { success: false, error: err?.message || "Failed to send reset email." };
      }
    }

    // Local / demo fallback mode
    return {
      success: true,
      message:
        "Password reset request received for " +
        email +
        ". If using local demo access, you can also sign in directly or configure administrator credentials in .env.local.",
    };
  };

  return {
    isAuthenticated,
    userEmail,
    login,
    logout,
    resetPassword,
  };
}
