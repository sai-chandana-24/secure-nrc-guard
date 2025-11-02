-- Create enum types only if they don't exist
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'district', 'block', 'supervisor', 'teacher', 'nrc', 'public');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.fund_status AS ENUM ('pending', 'approved', 'transferred', 'utilized', 'audited');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.child_condition AS ENUM ('critical', 'severe', 'moderate', 'improving', 'recovered');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.admission_status AS ENUM ('active', 'discharged', 'referred', 'follow_up');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create profiles table (user information)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  designation TEXT,
  department TEXT,
  district TEXT,
  block TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table (for RBAC)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Districts table
CREATE TABLE IF NOT EXISTS public.districts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  population INTEGER,
  total_blocks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Blocks table
CREATE TABLE IF NOT EXISTS public.blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_id UUID REFERENCES public.districts(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  villages_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- NRC Centers table
CREATE TABLE IF NOT EXISTS public.nrc_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  district_id UUID REFERENCES public.districts(id) ON DELETE CASCADE,
  block_id UUID REFERENCES public.blocks(id) ON DELETE CASCADE,
  bed_capacity INTEGER DEFAULT 0,
  current_occupancy INTEGER DEFAULT 0,
  contact_person TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Fund Allocations table (with blockchain-style audit trail)
CREATE TABLE IF NOT EXISTS public.fund_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_hash TEXT UNIQUE,
  from_entity TEXT NOT NULL,
  to_entity TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  purpose TEXT NOT NULL,
  status fund_status DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  fiscal_year TEXT NOT NULL,
  quarter TEXT,
  district_id UUID REFERENCES public.districts(id),
  block_id UUID REFERENCES public.blocks(id),
  remarks TEXT,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Children records table
CREATE TABLE IF NOT EXISTS public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age_months INTEGER,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  father_name TEXT,
  mother_name TEXT,
  contact_number TEXT,
  address TEXT,
  village TEXT,
  block_id UUID REFERENCES public.blocks(id),
  district_id UUID REFERENCES public.districts(id),
  current_weight DECIMAL(5,2),
  current_height DECIMAL(5,2),
  muac DECIMAL(4,1),
  condition child_condition,
  identified_by UUID REFERENCES auth.users(id),
  identified_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- NRC Admissions table
CREATE TABLE IF NOT EXISTS public.nrc_admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_number TEXT UNIQUE NOT NULL,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  nrc_center_id UUID REFERENCES public.nrc_centers(id) ON DELETE CASCADE NOT NULL,
  admission_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  discharge_date TIMESTAMP WITH TIME ZONE,
  admission_weight DECIMAL(5,2) NOT NULL,
  admission_height DECIMAL(5,2),
  admission_muac DECIMAL(4,1),
  target_weight DECIMAL(5,2),
  current_status admission_status DEFAULT 'active',
  days_in_treatment INTEGER DEFAULT 0,
  recovery_percentage DECIMAL(5,2) DEFAULT 0,
  complications TEXT,
  admitted_by UUID REFERENCES auth.users(id),
  discharged_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Treatment Plans table
CREATE TABLE IF NOT EXISTS public.treatment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_id UUID REFERENCES public.nrc_admissions(id) ON DELETE CASCADE NOT NULL,
  plan_date DATE DEFAULT CURRENT_DATE,
  diet_plan TEXT,
  medicines TEXT,
  interventions TEXT,
  monitoring_notes TEXT,
  weight_recorded DECIMAL(5,2),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nrc_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nrc_admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_plans ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can view districts" ON public.districts;
DROP POLICY IF EXISTS "Admins and district officers can manage districts" ON public.districts;
DROP POLICY IF EXISTS "Authenticated users can view blocks" ON public.blocks;
DROP POLICY IF EXISTS "Admins, district and block officers can manage blocks" ON public.blocks;
DROP POLICY IF EXISTS "Authenticated users can view NRC centers" ON public.nrc_centers;
DROP POLICY IF EXISTS "Authorized users can manage NRC centers" ON public.nrc_centers;
DROP POLICY IF EXISTS "Authenticated users can view fund allocations" ON public.fund_allocations;
DROP POLICY IF EXISTS "Authorized users can create fund allocations" ON public.fund_allocations;
DROP POLICY IF EXISTS "Admins can update fund allocations" ON public.fund_allocations;
DROP POLICY IF EXISTS "Authenticated users can view children records" ON public.children;
DROP POLICY IF EXISTS "Field workers can create children records" ON public.children;
DROP POLICY IF EXISTS "Field workers can update children records" ON public.children;
DROP POLICY IF EXISTS "Authenticated users can view admissions" ON public.nrc_admissions;
DROP POLICY IF EXISTS "NRC staff can manage admissions" ON public.nrc_admissions;
DROP POLICY IF EXISTS "Authenticated users can view treatment plans" ON public.treatment_plans;
DROP POLICY IF EXISTS "NRC staff can manage treatment plans" ON public.treatment_plans;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for districts
CREATE POLICY "Authenticated users can view districts"
  ON public.districts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and district officers can manage districts"
  ON public.districts FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'district')
  );

-- RLS Policies for blocks
CREATE POLICY "Authenticated users can view blocks"
  ON public.blocks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins, district and block officers can manage blocks"
  ON public.blocks FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'district') OR
    public.has_role(auth.uid(), 'block')
  );

-- RLS Policies for NRC centers
CREATE POLICY "Authenticated users can view NRC centers"
  ON public.nrc_centers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authorized users can manage NRC centers"
  ON public.nrc_centers FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'district') OR
    public.has_role(auth.uid(), 'nrc')
  );

-- RLS Policies for fund allocations
CREATE POLICY "Authenticated users can view fund allocations"
  ON public.fund_allocations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authorized users can create fund allocations"
  ON public.fund_allocations FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'district') OR
    public.has_role(auth.uid(), 'block')
  );

CREATE POLICY "Admins can update fund allocations"
  ON public.fund_allocations FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for children
CREATE POLICY "Authenticated users can view children records"
  ON public.children FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Field workers can create children records"
  ON public.children FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'teacher') OR
    public.has_role(auth.uid(), 'supervisor') OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Field workers can update children records"
  ON public.children FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'teacher') OR
    public.has_role(auth.uid(), 'supervisor') OR
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'nrc')
  );

-- RLS Policies for admissions
CREATE POLICY "Authenticated users can view admissions"
  ON public.nrc_admissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "NRC staff can manage admissions"
  ON public.nrc_admissions FOR ALL
  USING (
    public.has_role(auth.uid(), 'nrc') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for treatment plans
CREATE POLICY "Authenticated users can view treatment plans"
  ON public.treatment_plans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "NRC staff can manage treatment plans"
  ON public.treatment_plans FOR ALL
  USING (
    public.has_role(auth.uid(), 'nrc') OR
    public.has_role(auth.uid(), 'admin')
  );

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_districts_updated_at ON public.districts;
DROP TRIGGER IF EXISTS update_blocks_updated_at ON public.blocks;
DROP TRIGGER IF EXISTS update_nrc_centers_updated_at ON public.nrc_centers;
DROP TRIGGER IF EXISTS update_fund_allocations_updated_at ON public.fund_allocations;
DROP TRIGGER IF EXISTS update_children_updated_at ON public.children;
DROP TRIGGER IF EXISTS update_nrc_admissions_updated_at ON public.nrc_admissions;
DROP TRIGGER IF EXISTS update_treatment_plans_updated_at ON public.treatment_plans;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_districts_updated_at BEFORE UPDATE ON public.districts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blocks_updated_at BEFORE UPDATE ON public.blocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nrc_centers_updated_at BEFORE UPDATE ON public.nrc_centers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fund_allocations_updated_at BEFORE UPDATE ON public.fund_allocations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON public.children
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nrc_admissions_updated_at BEFORE UPDATE ON public.nrc_admissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_treatment_plans_updated_at BEFORE UPDATE ON public.treatment_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate blockchain-style transaction hash
CREATE OR REPLACE FUNCTION public.generate_transaction_hash()
RETURNS TRIGGER AS $$
BEGIN
  NEW.transaction_hash = encode(
    digest(
      NEW.id::text || NEW.from_entity || NEW.to_entity || 
      NEW.amount::text || NEW.created_at::text || random()::text,
      'sha256'
    ),
    'hex'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS generate_fund_allocation_hash ON public.fund_allocations;

-- Add trigger for blockchain hash generation
CREATE TRIGGER generate_fund_allocation_hash 
  BEFORE INSERT ON public.fund_allocations
  FOR EACH ROW EXECUTE FUNCTION public.generate_transaction_hash();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, designation, department)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'designation', 'Government Official'),
    COALESCE(NEW.raw_user_meta_data->>'department', 'NRC Department')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'public');
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger for auto-creating profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();