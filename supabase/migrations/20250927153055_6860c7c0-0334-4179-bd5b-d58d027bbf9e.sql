-- Add missing village and city columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS village text,
ADD COLUMN IF NOT EXISTS city text;