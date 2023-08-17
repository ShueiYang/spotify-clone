import { Song } from "@/types/custom.types";
import { createServerSupabaseClient } from "@/supabase/server";


export default async function getSongs(): Promise<Song[]> {

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: true })
  
    if(error) {
      console.error(error)
    }
    if(!data) {
      return [];
    }
    return data as Song[];
}
