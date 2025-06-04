import { createBrowserSupabaseClient } from "@/supabase/utils/client";
import { Song } from "@/types/custom.types";

export function useLoadImageUrl(song: Song) {
  const supabase = createBrowserSupabaseClient();
  if (!song) {
    return null;
  }
  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
}

export function useLoadSongUrl(song: Song) {
  const supabase = createBrowserSupabaseClient();
  if (!song) {
    return null;
  }
  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
}
