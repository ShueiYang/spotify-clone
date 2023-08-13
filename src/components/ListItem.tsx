"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { useUserStore } from "@/hooks/useUserStore"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaPlay } from "react-icons/fa"

interface ListItemProps {
  image: string
  name: string
  href: string
}

const ListItem: React.FC<ListItemProps> = ({
  image,
  name,
  href
}) => {
  const router = useRouter();
  const onOpen = useAuthModal((state) => state.onOpen)
  const user = useUserStore((state) => state.user)

  function handleAuth () {
    if(!user) {
      return onOpen();
    }
    router.push(href)
  }

  return (
    <button 
      onClick={handleAuth}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4
     bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4 min-w-[240px]"
    >
      <div className="relative min-w-[64px] min-h-[64px]">
        <Image 
          className="object-cover"
          src={image}
          alt="favorite icon"
          fill
          sizes="(max-width: 64px) 100vw"
        />
      </div>
      <p className="font-medium truncate py-5">
        {name}
      </p>
      <div className="play-btn absolute right-5 justify-center">
        <FaPlay className="text-black" />
      </div>
    </button>
  )
}

export default ListItem;