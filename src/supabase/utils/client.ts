import { createBrowserClient } from "@supabase/ssr";

import { Database } from "@/supabase/database.types";

/**
 * Creates a Supabase client that runs on the browser.
 */
export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
