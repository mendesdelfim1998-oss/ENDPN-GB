-- Migration for shared site content, visitor counts, and admin restore points.
-- Admin writes require a Supabase Auth user with app_metadata.role = 'admin'.

CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

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

INSERT INTO public.site_settings (key, value)
VALUES ('logo', '/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png')
ON CONFLICT (key) DO NOTHING;

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
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
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

CREATE TABLE IF NOT EXISTS public.site_visitors (
  visitor_id UUID PRIMARY KEY,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_visitors ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.site_visitors FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.record_site_visit(p_visitor_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  visitor_total BIGINT;
BEGIN
  IF p_visitor_id IS NULL THEN
    RAISE EXCEPTION 'A visitor identifier is required.';
  END IF;
  INSERT INTO public.site_visitors (visitor_id)
  VALUES (p_visitor_id)
  ON CONFLICT (visitor_id) DO NOTHING;
  SELECT count(*) INTO visitor_total FROM public.site_visitors;
  RETURN visitor_total;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_site_visitor_count()
RETURNS BIGINT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT count(*) FROM public.site_visitors;
$$;

CREATE OR REPLACE FUNCTION public.reset_site_visitors()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Administrator access is required.';
  END IF;
  DELETE FROM public.site_visitors;
  RETURN 0;
END;
$$;

REVOKE ALL ON FUNCTION public.record_site_visit(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_site_visitor_count() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reset_site_visitors() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_site_visit(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_site_visitor_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reset_site_visitors() TO authenticated;

CREATE TABLE IF NOT EXISTS public.site_backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  articles JSONB NOT NULL,
  site_settings JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_backups ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.site_backups FROM anon, authenticated;
GRANT SELECT ON TABLE public.site_backups TO authenticated;
DROP POLICY IF EXISTS "Admins can read site backups" ON public.site_backups;
CREATE POLICY "Admins can read site backups"
  ON public.site_backups FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE OR REPLACE FUNCTION public.create_site_backup(p_label TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  backup_id UUID;
BEGIN
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Administrator access is required.';
  END IF;

  INSERT INTO public.site_backups (label, articles, site_settings, created_by)
  VALUES (
    COALESCE(NULLIF(left(trim(p_label), 200), ''), 'Ponto de restauro'),
    COALESCE((SELECT jsonb_agg(to_jsonb(a) ORDER BY a.created_at) FROM public.articles a), '[]'::jsonb),
    COALESCE((SELECT jsonb_agg(to_jsonb(s) ORDER BY s.key) FROM public.site_settings s), '[]'::jsonb),
    auth.uid()
  )
  RETURNING id INTO backup_id;
  RETURN backup_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.restore_site_backup(p_backup_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  selected_backup public.site_backups%ROWTYPE;
BEGIN
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Administrator access is required.';
  END IF;

  SELECT * INTO selected_backup
  FROM public.site_backups
  WHERE id = p_backup_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Restore point not found.';
  END IF;

  INSERT INTO public.site_backups (label, articles, site_settings, created_by)
  VALUES (
    'Antes de restaurar: ' || selected_backup.label,
    COALESCE((SELECT jsonb_agg(to_jsonb(a) ORDER BY a.created_at) FROM public.articles a), '[]'::jsonb),
    COALESCE((SELECT jsonb_agg(to_jsonb(s) ORDER BY s.key) FROM public.site_settings s), '[]'::jsonb),
    auth.uid()
  );

  DELETE FROM public.articles;
  INSERT INTO public.articles (id, title, date, author, excerpt, category, image_url, created_at)
  SELECT id, title, date, author, excerpt, category, image_url, created_at
  FROM jsonb_populate_recordset(NULL::public.articles, selected_backup.articles);

  DELETE FROM public.site_settings;
  INSERT INTO public.site_settings (key, value, updated_at)
  SELECT key, value, updated_at
  FROM jsonb_populate_recordset(NULL::public.site_settings, selected_backup.site_settings);
END;
$$;

REVOKE ALL ON FUNCTION public.create_site_backup(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.restore_site_backup(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_site_backup(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.restore_site_backup(UUID) TO authenticated;

NOTIFY pgrst, 'reload schema';
