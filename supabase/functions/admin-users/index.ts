import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

function respond(status: number, body: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

Deno.serve(async request => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (request.method !== 'POST') {
    return respond(405, { error: 'Method not allowed.' });
  }

  const authorization = request.headers.get('Authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return respond(401, { error: 'An administrator session is required.' });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    console.error('Missing Supabase environment variables for admin-users function.');
    return respond(500, { error: 'Administrator account service is not configured.' });
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || userData.user?.app_metadata.role !== 'admin') {
    return respond(403, { error: 'Administrator access is required.' });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return respond(400, { error: 'A valid JSON request body is required.' });
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return respond(400, { error: 'A valid JSON object is required.' });
  }
  const body = payload as Record<string, unknown>;

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(400, { error: 'Enter a valid email address.' });
  }
  if (
    password.length < 12 ||
    password.length > 128 ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    return respond(400, {
      error: 'Use 12-128 characters with uppercase, lowercase, a number, and a symbol.'
    });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: 'admin' }
  });
  if (createError) {
    console.error('Could not create administrator account:', createError);
    return respond(createError.message.toLowerCase().includes('already') ? 409 : 400, {
      error: createError.message
    });
  }

  return respond(201, { message: 'Administrator account created.' });
});
