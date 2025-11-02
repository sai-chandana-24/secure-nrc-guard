-- Fix security warning: Set search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix security warning: Set search_path for generate_transaction_hash function
CREATE OR REPLACE FUNCTION public.generate_transaction_hash()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;