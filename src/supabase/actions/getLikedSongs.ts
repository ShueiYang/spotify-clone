import { User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/supabase/utils/server";
import { Song } from "@/types/custom.types";

export async function getFavoriteSongs(user: User | null): Promise<Song[]> {
  if (!user) {
    return [];
  }
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("favorite_songs")
    .select("*, songs(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const favoriteSongs = data.map((item) => {
    return {
      ...item.songs,
    };
  }) as Song[];

  return favoriteSongs;
}
