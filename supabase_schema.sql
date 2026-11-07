-- Run this script in the Supabase SQL Editor to enable shared publications and images.
-- Admin users must have app_metadata.role = 'admin'; never put a service-role key in the browser.

CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow write site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated write access" ON public.site_settings;
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings"
  ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Allow public read articles" ON public.articles;
DROP POLICY IF EXISTS "Allow write articles" ON public.articles;
DROP POLICY IF EXISTS "Public can read articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can manage articles" ON public.articles;
CREATE POLICY "Public can read articles"
  ON public.articles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage articles"
  ON public.articles FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('site-images', 'site-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view site images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload site images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update site images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete site images" ON storage.objects;
CREATE POLICY "Public can view site images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-images');
CREATE POLICY "Admins can upload site images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'site-images'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
CREATE POLICY "Admins can update site images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'site-images'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    bucket_id = 'site-images'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
CREATE POLICY "Admins can delete site images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'site-images'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

INSERT INTO public.site_settings (key, value)
VALUES
  ('logo', '/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png'),
  ('heroBanner', '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg')
ON CONFLICT (key) DO NOTHING;

DELETE FROM public.site_settings
WHERE key = 'audienceShowcase'
  AND value = '/src/assets/images/consular_citizenship_reception_1792939718416.jpg';

INSERT INTO public.articles (id, title, date, author, excerpt, category, image_url)
VALUES (
  'art-official-001',
  'Abertura Oficial dos Novos Serviços de Apoio Notarial e Naturalização em Safim',
  '04 Nov 2026',
  'Direção EMDPN-GB',
  'O EMDPN-GB anuncia a ampliação do atendimento ao público e à diáspora internacional, com canais digitais de agendamento prioritário e validação célere perante os órgãos de soberania.',
  'Institucional',
  '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg'
)
ON CONFLICT (id) DO NOTHING;
