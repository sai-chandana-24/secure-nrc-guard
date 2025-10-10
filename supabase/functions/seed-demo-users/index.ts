// Seed demo users edge function - creates default accounts idempotently
// Uses service role to create users and assign roles
import { createClient } from 'npm:@supabase/supabase-js@2';

type DemoUser = {
  email: string;
  full_name: string;
  role: 'admin' | 'district' | 'block' | 'supervisor' | 'teacher' | 'nrc' | 'public';
  designation: string;
  department: string;
};

const DEFAULT_PASSWORD = 'admin123';

const DEMO_USERS: DemoUser[] = [
  { email: 'admin@chhattisgarh.gov.in', full_name: 'Administrator', role: 'admin', designation: 'Administrator', department: 'NRC HQ' },
  { email: 'district@chhattisgarh.gov.in', full_name: 'District Officer', role: 'district', designation: 'District Officer', department: 'District Administration' },
  { email: 'block@chhattisgarh.gov.in', full_name: 'Block Officer', role: 'block', designation: 'Block Officer', department: 'Block Administration' },
  { email: 'supervisor@chhattisgarh.gov.in', full_name: 'Field Supervisor', role: 'supervisor', designation: 'Supervisor', department: 'Field Operations' },
  { email: 'teacher@chhattisgarh.gov.in', full_name: 'Teacher', role: 'teacher', designation: 'Teacher', department: 'Education' },
  { email: 'nrc@chhattisgarh.gov.in', full_name: 'NRC Officer', role: 'nrc', designation: 'NRC Officer', department: 'NRC Center' },
  { email: 'public@example.com', full_name: 'Public User', role: 'public', designation: 'Citizen', department: 'Public' },
];

async function ensureUserAndRole(supabase: any, u: DemoUser) {
  let userId: string | null = null;
  let created = false;

  // Try to create the user (email confirmed)
  const { data: createData, error: createErr } = await supabase.auth.admin.createUser({
    email: u.email,
    password: DEFAULT_PASSWORD,
    email_confirm: true,
    user_metadata: {
      full_name: u.full_name,
      designation: u.designation,
      department: u.department,
    },
  });

  if (createErr) {
    // If already exists, find by email
    const listRes = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const found = listRes.data.users?.find((x: any) => x.email?.toLowerCase() === u.email.toLowerCase());
    userId = found?.id ?? null;
  } else {
    userId = createData.user?.id ?? null;
    created = true;
  }

  if (!userId) {
    return { email: u.email, created: false, role_assigned: false, status: 'error_no_user' };
  }

  // Assign specific role in user_roles (ignore duplicates)
  const { error: roleErr } = await (supabase as any)
    .from('user_roles')
    .insert({ user_id: userId, role: u.role });

  const roleAssigned = !roleErr || (roleErr as any)?.code === '23505';

  return { email: u.email, created, role_assigned: roleAssigned, status: 'ok' };
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!url || !serviceRoleKey) {
    return new Response('Server not configured', { status: 500 });
  }

  const supabase = createClient(url, serviceRoleKey) as any;

  const results = [] as any[];
  for (const u of DEMO_USERS) {
    try {
      const res = await ensureUserAndRole(supabase, u);
      results.push(res);
    } catch (e) {
      results.push({ email: u.email, status: 'error', error: String(e) });
    }
  }

  return new Response(JSON.stringify({ ok: true, results }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
});
