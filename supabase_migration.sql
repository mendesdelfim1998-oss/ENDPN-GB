-- Migration: Site Settings Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read site_settings" ON site_settings
  FOR SELECT USING (true);

-- Allow authenticated write access
CREATE POLICY "Allow write site_settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Seed initial value for emblem
INSERT INTO site_settings (key, value)
VALUES ('emblema_url', '/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png')
ON CONFLICT (key) DO NOTHING;
