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
DROP POLICY IF EXISTS "Staff can publish articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can update articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can delete articles" ON public.articles;
CREATE POLICY "Public can read articles"
  ON public.articles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can publish articles"
  ON public.articles FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'secretaria'));
CREATE POLICY "Admins can update articles"
  ON public.articles FOR UPDATE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can upload site images" ON storage.objects;
DROP POLICY IF EXISTS "Staff can upload publication images" ON storage.objects;
CREATE POLICY "Staff can upload publication images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'site-images'
    AND (
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
      OR (
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'secretaria'
        AND name LIKE 'publication-%'
      )
    )
  );

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

CREATE OR REPLACE FUNCTION public.delete_site_backup(p_backup_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Administrator access is required.';
  END IF;
  DELETE FROM public.site_backups WHERE id = p_backup_id;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  IF deleted_count = 0 THEN
    RAISE EXCEPTION 'Restore point not found.';
  END IF;
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
REVOKE ALL ON FUNCTION public.delete_site_backup(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.restore_site_backup(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_site_backup(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_site_backup(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.restore_site_backup(UUID) TO authenticated;

CREATE TABLE IF NOT EXISTS public.service_fees (
  service_id TEXT PRIMARY KEY CHECK (service_id IN (
    'naturalizacao_residencia',
    'nacionalidade_casamento',
    'nacionalidade_descendencia',
    'alteracao_ratificacao_nome',
    'passaporte_biometrico',
    'bilhete_identidade',
    'registo_criminal',
    'cedula_nascimento'
  )),
  fee TEXT NOT NULL CHECK (length(trim(fee)) BETWEEN 1 AND 160),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.service_fees ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON TABLE public.service_fees TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.service_fees TO authenticated;
DROP POLICY IF EXISTS "Public can read service fees" ON public.service_fees;
DROP POLICY IF EXISTS "Admins can manage service fees" ON public.service_fees;
CREATE POLICY "Public can read service fees"
  ON public.service_fees FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage service fees"
  ON public.service_fees FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_number TEXT NOT NULL UNIQUE,
  service_type TEXT NOT NULL,
  service_name TEXT NOT NULL,
  official_fee TEXT NOT NULL,
  modality TEXT NOT NULL CHECK (modality IN ('presencial', 'online')),
  date DATE NOT NULL,
  "time" TIME NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  document_number TEXT,
  country_of_residence TEXT NOT NULL,
  country_code TEXT,
  preferred_channel TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'confirmado', 'concluido', 'cancelado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.appointments FROM anon, authenticated;
GRANT INSERT ON TABLE public.appointments TO authenticated;
GRANT SELECT, DELETE ON TABLE public.appointments TO authenticated;
REVOKE UPDATE ON TABLE public.appointments FROM authenticated;
GRANT UPDATE (status) ON TABLE public.appointments TO authenticated;
DROP POLICY IF EXISTS "Public can submit pending appointments" ON public.appointments;
DROP POLICY IF EXISTS "Staff can view appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can update appointments" ON public.appointments;
DROP POLICY IF EXISTS "Staff can update appointment status" ON public.appointments;
DROP POLICY IF EXISTS "Admins can delete appointments" ON public.appointments;
CREATE POLICY "Public can submit pending appointments"
  ON public.appointments FOR INSERT TO authenticated
  WITH CHECK (status = 'pendente');
CREATE POLICY "Staff can view appointments"
  ON public.appointments FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'secretaria'));
CREATE POLICY "Staff can update appointment status"
  ON public.appointments FOR UPDATE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'secretaria'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'secretaria'));
CREATE POLICY "Admins can delete appointments"
  ON public.appointments FOR DELETE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE OR REPLACE FUNCTION public.submit_appointment(
  p_service_type TEXT,
  p_service_name TEXT,
  p_official_fee TEXT,
  p_modality TEXT,
  p_date DATE,
  p_time TIME,
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_document_number TEXT,
  p_country_of_residence TEXT,
  p_country_code TEXT,
  p_preferred_channel TEXT,
  p_notes TEXT
)
RETURNS TABLE (id UUID, protocol_number TEXT, created_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NULLIF(trim(p_full_name), '') IS NULL
    OR NULLIF(trim(p_phone), '') IS NULL
    OR NULLIF(trim(p_service_name), '') IS NULL
    OR p_date < current_date
    OR p_modality NOT IN ('presencial', 'online') THEN
    RAISE EXCEPTION 'Invalid appointment details.';
  END IF;

  RETURN QUERY
  INSERT INTO public.appointments (
    protocol_number, service_type, service_name, official_fee, modality, date, "time",
    full_name, email, phone, document_number, country_of_residence, country_code,
    preferred_channel, notes, status
  )
  VALUES (
    'EMDPN-' || extract(year FROM current_date)::TEXT || '-' ||
      upper(substr(replace(gen_random_uuid()::TEXT, '-', ''), 1, 8)),
    left(trim(p_service_type), 300),
    left(trim(p_service_name), 500),
    left(trim(p_official_fee), 500),
    p_modality,
    p_date,
    p_time,
    left(trim(p_full_name), 200),
    NULLIF(left(trim(p_email), 254), ''),
    left(trim(p_phone), 40),
    NULLIF(left(trim(p_document_number), 100), ''),
    left(trim(p_country_of_residence), 150),
    NULLIF(left(trim(p_country_code), 10), ''),
    NULLIF(left(trim(p_preferred_channel), 100), ''),
    NULLIF(left(trim(p_notes), 2000), ''),
    'pendente'
  )
  RETURNING appointments.id, appointments.protocol_number, appointments.created_at;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_appointment(
  TEXT, TEXT, TEXT, TEXT, DATE, TIME, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT
) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_appointment(
  TEXT, TEXT, TEXT, TEXT, DATE, TIME, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT
) TO anon, authenticated;

DROP FUNCTION IF EXISTS public.track_appointment(TEXT, TEXT);
CREATE OR REPLACE FUNCTION public.track_appointment(p_lookup TEXT)
RETURNS TABLE (
  protocol_number TEXT,
  service_name TEXT,
  official_fee TEXT,
  modality TEXT,
  date DATE,
  "time" TIME,
  status TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT a.protocol_number, a.service_name, a.official_fee, a.modality, a.date, a."time", a.status
  FROM public.appointments a
  WHERE upper(a.protocol_number) = upper(trim(p_lookup))
    OR (
      length(regexp_replace(trim(p_lookup), '[^0-9]', '', 'g')) >= 6
      AND regexp_replace(a.phone, '[^0-9]', '', 'g') =
        regexp_replace(trim(p_lookup), '[^0-9]', '', 'g')
    )
  ORDER BY a.created_at DESC
  LIMIT 20;
$$;
REVOKE ALL ON FUNCTION public.track_appointment(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.track_appointment(TEXT) TO anon, authenticated;

NOTIFY pgrst, 'reload schema';
