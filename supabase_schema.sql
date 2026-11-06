-- SQL schema for Supabase integration in EMDPN-GB
-- Run this in your Supabase SQL Editor if you want to store settings & articles in Postgres!

-- 1. Table for site settings (emblem logo URL, banner, audience photo, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site_settings
CREATE POLICY "Allow public read site_settings" ON site_settings
  FOR SELECT USING (true);

-- Allow insert/update to site_settings
CREATE POLICY "Allow write site_settings" ON site_settings
  FOR ALL USING (true);

-- 2. Table for public articles & announcements
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to articles
CREATE POLICY "Allow public read articles" ON articles
  FOR SELECT USING (true);

-- Allow insert/update/delete to articles
CREATE POLICY "Allow write articles" ON articles
  FOR ALL USING (true);

-- Initial seed settings
INSERT INTO site_settings (key, value)
VALUES 
  ('logo', '/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png'),
  ('heroBanner', '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg'),
  ('audienceShowcase', '/src/assets/images/consular_citizenship_reception_1792939718416.jpg')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
