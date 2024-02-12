import { createClientSupabaseClient } from "@/supabase/client";
import { Song } from "@/types/custom.types";

export const useLoadImageUrl = (song: Song) => {
  const supabase = createClientSupabaseClient();
  if (!song) {
    return null;
  }
  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export const useLoadSongUrl = (song: Song) => {
  const supabase = createClientSupabaseClient();
  if (!song) {
    return null;
  }
  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};
