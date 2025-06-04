import { createServerSupabaseClient } from "@/supabase/utils/server";

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error(sessionError.message);
      return null;
    }
    return sessionData.session;
  } catch (err) {
    console.error("SessionError:", err);
    return null;
  }
}

export async function getUser() {
  const supabase = await createServerSupabaseClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("UserError:", error);
    return null;
  }
}
