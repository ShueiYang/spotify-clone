"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { createBrowserSupabaseClient } from "@/supabase/utils/client";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUserStore } from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";
import { SvgIcon } from "../svg/SvgIcon";
import TooltipMenu from "../Tooltip";

interface LikeButtonProps {
  songId: string | number;
}

export function LikeButton({ songId }: Readonly<LikeButtonProps>) {
  const router = useRouter();

  // --- Zustand custom hook ---
  const user = useUserStore((state) => state.user);
  const onOpen = useAuthModal((state) => state.onOpen);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function fetchFavoriteSong() {
      if (!user?.id) {
        return;
      }
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase
        .from("favorite_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId as number)
        .maybeSingle(); // query result must be 0 or 1 row otherwise return an error
      if (!error && data) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }

    fetchFavoriteSong();
  }, [user, songId]);

  async function handleLike() {
    const supabase = createBrowserSupabaseClient();

    if (!user) {
      return onOpen();
    }
    if (isLiked) {
      const { error } = await supabase
        .from("favorite_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId as number);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabase.from("favorite_songs").insert({
        song_id: songId as number,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }
    router.refresh();
  }

  return (
    <TooltipMenu
      content={isLiked ? "Remove from your favorite" : "Save to your favorite"}
    >
      <button
        type="button"
        className="transition hover:opacity-75"
        onClick={handleLike}
      >
        <SvgIcon
          name="Heart"
          size={25}
          color={isLiked ? "#0d9488" : "white"}
          fill={isLiked ? "#0d9488" : "none"}
        />
      </button>
    </TooltipMenu>
  );
}
