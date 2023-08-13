"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { GoHomeFill } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import Box from "../Box";
import SidebarItem from "./SidebarItem";
import SongLibrary from "./SongLibrary";
import { Song } from "@/types/custom.types";

export interface SidebarProps {
  userSongs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({
  userSongs
}) => {
  const pathname = usePathname();
  
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
      <Box className="overflow-y-auto h-full">
        <SongLibrary userSongs={userSongs} />
      </Box>
    </div> 
  )
}

export default Sidebar;