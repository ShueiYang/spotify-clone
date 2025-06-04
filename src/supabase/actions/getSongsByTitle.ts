import { Song } from "@/types/custom.types";
import { getSongs } from "@/supabase/actions/getSongs";
import { createServerSupabaseClient } from "@/supabase/utils/server";

export async function getSongsByTitle(title: string): Promise<Song[]> {
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }
  if (!data) {
    return [];
  }
  return data as Song[];
}
