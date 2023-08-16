import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/database.types";


export const createClientSupabaseClient = () => {
  return createClientComponentClient<Database>();
}