import { Song } from "@/types/custom.types";
import { createServerSupabaseClient, getSession } from "@/supabase/server";

export default async function getSongsByUserId(): Promise<Song[]> {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  if (!session) {
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
  }
  if (!data) {
    return [];
  }
  return data as Song[];
}
