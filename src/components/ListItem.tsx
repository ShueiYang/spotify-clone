"use client";

import Image from "next/image";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useUserStore } from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";
import { SvgIcon } from "./svg/SvgIcon";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const onOpen = useAuthModal((state) => state.onOpen);
  const user = useUserStore((state) => state.user);

  function handleAuth() {
    if (!user) {
      return onOpen();
    }
    router.push(href);
  }

  return (
    <button
      type="button"
      onClick={handleAuth}
      className="group relative flex min-w-[240px] items-center gap-x-4 overflow-hidden
     rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          className="object-cover"
          src={image}
          alt="favorite icon"
          fill
          sizes="(max-width: 64px) 100vw"
        />
      </div>
      <p className="truncate py-5 font-medium">{name}</p>
      <div className="play-btn absolute right-5 justify-center">
        <SvgIcon
          name="Play"
          size={20}
          fill="black"
          className="text-black"
        />
      </div>
    </button>
  );
};

export default ListItem;
