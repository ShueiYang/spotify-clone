import { Song } from "@/types/custom.types";
import { createServerSupabaseClient } from "@/supabase/server";
import getSongs from "./getSongs";


export default async function getSongsByTitle(title: string): Promise<Song[]> {

  if(!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false })
  
    if(error) {
      console.error(error)
    }
    if(!data) {
      return [];
    }
    return data as Song[];
}