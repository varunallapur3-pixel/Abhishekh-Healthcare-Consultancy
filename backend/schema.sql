-- ==============================================================================
-- Supabase PostgreSQL Schema: Consultation Enquiries Table
-- Project: Abhishekh Healthcare Consultancy
-- ==============================================================================

-- 1. Enable pgcrypto for UUID generation if not already active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create the enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,
    advisory_interest VARCHAR(100) DEFAULT NULL,
    requirements TEXT DEFAULT NULL,
    status VARCHAR(50) DEFAULT 'new' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries (email);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Define RLS Policies:
-- (a) Allow public (anonymous / authenticated users) to submit an enquiry
DROP POLICY IF EXISTS "Allow public enquiry submission" ON public.enquiries;
CREATE POLICY "Allow public enquiry submission" 
ON public.enquiries 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- (b) Restrict SELECT access: Only service_role can read enquiries
DROP POLICY IF EXISTS "Restrict read access to service role" ON public.enquiries;
CREATE POLICY "Restrict read access to service role" 
ON public.enquiries 
FOR SELECT 
TO service_role
USING (true);

-- (c) Restrict UPDATE and DELETE: Only service_role can modify enquiries
DROP POLICY IF EXISTS "Restrict update to service role" ON public.enquiries;
CREATE POLICY "Restrict update to service role" 
ON public.enquiries 
FOR UPDATE 
TO service_role
USING (true);

DROP POLICY IF EXISTS "Restrict delete to service role" ON public.enquiries;
CREATE POLICY "Restrict delete to service role" 
ON public.enquiries 
FOR DELETE 
TO service_role
USING (true);

-- 6. Add table and column documentation
COMMENT ON TABLE public.enquiries IS 'Consultation enquiries submitted through the Abhishekh Healthcare Consultancy web portal.';
COMMENT ON COLUMN public.enquiries.id IS 'Unique identifier for the enquiry.';
COMMENT ON COLUMN public.enquiries.full_name IS 'Full name of the requesting healthcare leader/representative.';
COMMENT ON COLUMN public.enquiries.phone IS 'Contact telephone or mobile number with country code.';
COMMENT ON COLUMN public.enquiries.email IS 'Official work email address for correspondence.';
COMMENT ON COLUMN public.enquiries.advisory_interest IS 'Preferred consulting practice area or domain.';
COMMENT ON COLUMN public.enquiries.requirements IS 'Details of institutional scope, facility scale, and priorities.';
COMMENT ON COLUMN public.enquiries.status IS 'Current processing status: new, in_review, contacted, closed.';
COMMENT ON COLUMN public.enquiries.created_at IS 'UTC timestamp when the enquiry was submitted.';
