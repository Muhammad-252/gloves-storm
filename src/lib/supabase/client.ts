import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-supabase-project.supabase.co" &&
    !supabaseUrl.includes("placeholder")
);

if (typeof window === "undefined") {
  if (isSupabaseConfigured) {
    console.log(`[Supabase Config] ✅ Connected to Supabase DB at ${supabaseUrl}`);
  } else {
    console.warn(`[Supabase Config] ❌ Supabase NOT configured! Missing or placeholder env vars:
      NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? "SET" : "MISSING"}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "SET" : "MISSING"}
      SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? "SET" : "MISSING"}`);
  }
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseServiceKey || supabaseAnonKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
