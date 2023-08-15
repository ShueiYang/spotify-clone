"use client"

import { Song } from "@/types/custom.types";
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react";
import { GoHomeFill } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import Box from "@/components/Box";
import SidebarItem from "./SidebarItem";
import SongLibrary from "./SongLibrary";
import Button from "@/components/customButtons/Button";
import { useUserStore } from "@/hooks/useUserStore";
import { useAuthModal } from "@/hooks/useAuthModal";

export interface SidebarProps {
  userSongs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({
  userSongs
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const onOpen = useAuthModal((state) => state.onOpen);
  
  const navigationItems = useMemo(() => [
    {
      label: "Home",
      href: "/",
      active: pathname !== "/search",
      icon: GoHomeFill,
    },
    {
      label: "Search",
      href: "/search",
      active: pathname === "/search",
      icon: BiSearch,
    },
  ], [pathname]);


  function handleSubscribe() {
    if(!user) {
      return onOpen();
    }
    return router.push("/account")
  }

  return (
    <div className="hidden md:flex flex-col gap-y-2 w-[300px] h-full p-2">
      <Box>
        <div className="flex flex-col px-5 py-4 gap-y-3">
          {navigationItems.map(item => (
            <SidebarItem
              key={item.label}
              {... item}              
            />
          ))}
        </div>
      </Box>
      <Box className="flex flex-col justify-between h-full">
        <SongLibrary userSongs={userSongs} />
        <div className="flex flex-col items-center p-6">
          <p className="text-center text-neutral-200">
            {`Subscribe to Premium to access more features (Test Mode)`}
          </p>
          <Button 
            className="bg-white w-[150px] px-4 py-2 my-4"
            onClick={handleSubscribe}
          >
            Plans & Billing
          </Button>
        </div>
      </Box>
    </div> 
  )
}

export default Sidebar;