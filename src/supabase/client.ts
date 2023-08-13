import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/database.types";


const supabaseClient = createClientComponentClient<Database>();

export default supabaseClient;