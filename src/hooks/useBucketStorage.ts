import supabaseClient from "@/supabase/client";
import { Song } from "@/types/custom.types";


export const useLoadImageUrl = (song: Song) => {
  if(!song) {
    return null;
  }
  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path)
  
    return imageData.publicUrl;
}


export const useLoadSongUrl = (song: Song) => {
  if(!song) {
    return null;
  }
  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path)
  
    return songData.publicUrl;
}