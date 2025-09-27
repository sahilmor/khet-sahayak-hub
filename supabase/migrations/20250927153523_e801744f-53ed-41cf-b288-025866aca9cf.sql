-- Recreate the handle_new_user function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'User'),
    NEW.raw_user_meta_data ->> 'phone',
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'farmer'),
    NEW.raw_user_meta_data ->> 'lab_name',
    NEW.raw_user_meta_data ->> 'lab_license_number',
    NEW.raw_user_meta_data ->> 'lab_address',
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'lab_services' IS NOT NULL 
      THEN string_to_array(NEW.raw_user_meta_data ->> 'lab_services', ',')
      ELSE NULL
    END,
    NEW.raw_user_meta_data ->> 'village',
    NEW.raw_user_meta_data ->> 'city',
    NEW.raw_user_meta_data ->> 'farm_location',
    NEW.raw_user_meta_data ->> 'farm_size'
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth process
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Create the trigger to automatically call handle_new_user when a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();