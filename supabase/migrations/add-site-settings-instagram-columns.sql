-- Adds the Instagram feed columns that the admin Settings page saves.
-- Safe to run more than once. Run in the Supabase SQL editor.
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS instagram_access_token TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS instagram_feed_mode TEXT DEFAULT 'api';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS instagram_widget_code TEXT;

-- Refresh PostgREST's schema cache so the API sees the new columns immediately.
NOTIFY pgrst, 'reload schema';
