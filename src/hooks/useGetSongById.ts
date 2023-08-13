import supabaseClient from "@/supabase/client";
import { toast } from "react-hot-toast";
import { Song } from "@/types/custom.types";
import { useEffect, useMemo, useState } from "react";



function  useGetSongById(id?: string) {

  const [ isLoading, setIsLoading ] = useState(false)
  const [ song, setSong ] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if(!id) {
      return;
    }

    const fetchSong = async () => {
      setIsLoading(true)
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single()

      if(error) {
        setIsLoading(false)
        return toast.error(error.message)
      }
      setSong(data as Song)
      setIsLoading(false);
    }

    fetchSong();
  }, [id])

  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song])

}

export default useGetSongById;