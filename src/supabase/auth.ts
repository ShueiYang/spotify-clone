import { createServerSupabaseClient } from "@/supabase/utils/server";

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
