-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    email,
    full_name,
    phone,
    role,
    lab_name,
    lab_license_number,
    lab_address,
    lab_services,
    village,
    city,
    farm_location,
    farm_size
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'phone',
    (NEW.raw_user_meta_data ->> 'role')::user_role,
    NEW.raw_user_meta_data ->> 'lab_name',
    NEW.raw_user_meta_data ->> 'lab_license_number',
    NEW.raw_user_meta_data ->> 'lab_address',
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'lab_services' IS NOT NULL 
      THEN ARRAY(SELECT unnest(string_to_array(NEW.raw_user_meta_data ->> 'lab_services', ',')))
      ELSE NULL
    END,
    NEW.raw_user_meta_data ->> 'village',
    NEW.raw_user_meta_data ->> 'city',
    NEW.raw_user_meta_data ->> 'farm_location',
    NEW.raw_user_meta_data ->> 'farm_size'
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();