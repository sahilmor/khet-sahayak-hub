-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('farmer', 'laboratory');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL,
    -- Farmer specific fields
    farm_location TEXT,
    farm_size TEXT,
    -- Laboratory specific fields
    lab_name TEXT,
    lab_license_number TEXT,
    lab_address TEXT,
    lab_services TEXT[],
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lab bookings table
CREATE TABLE public.lab_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    lab_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    test_type TEXT NOT NULL,
    sample_type TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
    farmer_contact TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Lab bookings policies
CREATE POLICY "Farmers can view their own bookings"
ON public.lab_bookings FOR SELECT 
USING (auth.uid() = farmer_id);

CREATE POLICY "Labs can view bookings made to them"
ON public.lab_bookings FOR SELECT 
USING (auth.uid() = lab_id);

CREATE POLICY "Farmers can create bookings"
ON public.lab_bookings FOR INSERT 
WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Labs can update bookings made to them"
ON public.lab_bookings FOR UPDATE 
USING (auth.uid() = lab_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(new.raw_user_meta_data->>'role', 'farmer')::user_role
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lab_bookings_updated_at
    BEFORE UPDATE ON public.lab_bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();