import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "../database.types";

/**
 * Creates a Supabase client that runs on the server.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              return cookieStore.set(name, value, options);
            });
          } catch (err) {
            console.error(
              "Failed to set cookies in createServerSupabaseClient:",
              err,
            );
          }
        },
      },
    },
  );
}
