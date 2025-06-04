import { createServerSupabaseClient } from "@/supabase/utils/server";
import { Song } from "@/types/custom.types";

export async function getSongs(): Promise<Song[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
  }
  if (!data) {
    return [];
  }
  return data as Song[];
}
