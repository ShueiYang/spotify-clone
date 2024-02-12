"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUserStore } from "@/hooks/useUserStore";
import { useUploadModal } from "@/hooks/useUploadModal";
import { SidebarProps } from "./Sidebar";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

const SongLibrary = ({ userSongs }: SidebarProps) => {
  // Zustand custom hook
  const onOpenAuth = useAuthModal((state) => state.onOpen);
  const onOpenUpload = useUploadModal((state) => state.onOpen);
  const user = useUserStore((state) => state.user);

  const onPlay = useOnPlay(userSongs);

  function handleUpload() {
    if (!user) {
      return onOpenAuth();
    }
    return onOpenUpload();
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <span className="font-medium text-neutral-400">Your Library</span>
        </div>
        <AiOutlinePlus
          onClick={handleUpload}
          size={22}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="mb-36 mt-4 flex flex-col gap-y-2 px-3">
        {userSongs.map((song) => (
          <MediaItem
            key={song.id}
            data={song}
            onClick={() => onPlay(song.id as string)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongLibrary;
