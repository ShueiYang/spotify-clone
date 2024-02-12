import { Song } from "@/types/custom.types";
import { Session } from "@supabase/auth-helpers-nextjs";
import { createServerSupabaseClient } from "@/supabase/server";

export default async function getFavoriteSongs(
  session: Session | null,
): Promise<Song[]> {
  if (!session) {
    return [];
  }
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("favorite_songs")
    .select("*, songs(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }
  if (!data) {
    return [];
  }
  return data.map((item) => ({
    ...item.songs,
  })) as Song[];
}
