"use client";

import { createClientSupabaseClient } from "@/supabase/client";
import { toast } from "react-hot-toast";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUserStore } from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import TooltipMenu from "../Tooltip";

interface LikeButtonProps {
  songId: string | number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  // Zustand custom hook
  const user = useUserStore((state) => state.user);
  const onOpen = useAuthModal((state) => state.onOpen);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchFavoriteSong = async () => {
      const supabase = createClientSupabaseClient();
      const { data, error } = await supabase
        .from("favorite_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .maybeSingle(); // query result must be 0 or 1 row otherwise return an error
      if (!error && data) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };
    fetchFavoriteSong();
  }, [user?.id, songId]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  async function handleLike() {
    const supabase = createClientSupabaseClient();

    if (!user) {
      return onOpen();
    }
    if (isLiked) {
      const { error } = await supabase
        .from("favorite_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

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
      <button className="transition hover:opacity-75" onClick={handleLike}>
        <Icon color={isLiked ? "#0d9488" : "white"} size={25} />
      </button>
    </TooltipMenu>
  );
};

export default LikeButton;
