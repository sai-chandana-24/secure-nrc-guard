-- Insert demo users into auth.users with encrypted passwords
-- Password for all accounts: admin123
-- Note: In production, users should sign up through the normal flow

-- Insert demo users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES
  -- Admin
  ('00000000-0000-0000-0000-000000000001'::uuid, '00000000-0000-0000-0000-000000000000', 'admin@chhattisgarh.gov.in', 
   crypt('admin123', gen_salt('bf')), now(), 
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Admin Officer","designation":"Administrator","department":"NRC Administration"}'::jsonb,
   now(), now(), '', '', '', ''),
  
  -- District Officer
  ('00000000-0000-0000-0000-000000000002'::uuid, '00000000-0000-0000-0000-000000000000', 'district@chhattisgarh.gov.in',
   crypt('admin123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"District Officer","designation":"District Coordinator","department":"District Administration"}'::jsonb,
   now(), now(), '', '', '', ''),
   
  -- Block Officer
  ('00000000-0000-0000-0000-000000000003'::uuid, '00000000-0000-0000-0000-000000000000', 'block@chhattisgarh.gov.in',
   crypt('admin123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Block Officer","designation":"Block Coordinator","department":"Block Administration"}'::jsonb,
   now(), now(), '', '', '', ''),
   
  -- Supervisor
  ('00000000-0000-0000-0000-000000000004'::uuid, '00000000-0000-0000-0000-000000000000', 'supervisor@chhattisgarh.gov.in',
   crypt('admin123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Field Supervisor","designation":"Supervisor","department":"Field Operations"}'::jsonb,
   now(), now(), '', '', '', ''),
   
  -- Teacher
  ('00000000-0000-0000-0000-000000000005'::uuid, '00000000-0000-0000-0000-000000000000', 'teacher@chhattisgarh.gov.in',
   crypt('admin123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Anganwadi Teacher","designation":"Teacher","department":"Anganwadi"}'::jsonb,
   now(), now(), '', '', '', ''),
   
  -- NRC Officer
  ('00000000-0000-0000-0000-000000000006'::uuid, '00000000-0000-0000-0000-000000000000', 'nrc@chhattisgarh.gov.in',
   crypt('admin123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"NRC Officer","designation":"NRC Coordinator","department":"NRC Center"}'::jsonb,
   now(), now(), '', '', '', ''),
   
  -- Public Access
  ('00000000-0000-0000-0000-000000000007'::uuid, '00000000-0000-0000-0000-000000000000', 'public@example.com',
   crypt('admin123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Public User","designation":"Citizen","department":"Public Access"}'::jsonb,
   now(), now(), '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- Insert corresponding profiles
INSERT INTO public.profiles (id, full_name, email, designation, department) VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Admin Officer', 'admin@chhattisgarh.gov.in', 'Administrator', 'NRC Administration'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'District Officer', 'district@chhattisgarh.gov.in', 'District Coordinator', 'District Administration'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Block Officer', 'block@chhattisgarh.gov.in', 'Block Coordinator', 'Block Administration'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Field Supervisor', 'supervisor@chhattisgarh.gov.in', 'Supervisor', 'Field Operations'),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Anganwadi Teacher', 'teacher@chhattisgarh.gov.in', 'Teacher', 'Anganwadi'),
  ('00000000-0000-0000-0000-000000000006'::uuid, 'NRC Officer', 'nrc@chhattisgarh.gov.in', 'NRC Coordinator', 'NRC Center'),
  ('00000000-0000-0000-0000-000000000007'::uuid, 'Public User', 'public@example.com', 'Citizen', 'Public Access')
ON CONFLICT (id) DO NOTHING;

-- Assign roles to demo users
INSERT INTO public.user_roles (user_id, role) VALUES
  -- Admin has admin role
  ('00000000-0000-0000-0000-000000000001'::uuid, 'admin'),
  -- District Officer has district role
  ('00000000-0000-0000-0000-000000000002'::uuid, 'district'),
  -- Block Officer has block role
  ('00000000-0000-0000-0000-000000000003'::uuid, 'block'),
  -- Supervisor has supervisor role
  ('00000000-0000-0000-0000-000000000004'::uuid, 'supervisor'),
  -- Teacher has teacher role
  ('00000000-0000-0000-0000-000000000005'::uuid, 'teacher'),
  -- NRC Officer has nrc role
  ('00000000-0000-0000-0000-000000000006'::uuid, 'nrc'),
  -- Public has public role
  ('00000000-0000-0000-0000-000000000007'::uuid, 'public')
ON CONFLICT (user_id, role) DO NOTHING;