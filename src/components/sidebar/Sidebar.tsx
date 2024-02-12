"use client";

import { Song } from "@/types/custom.types";
import { usePathname, useRouter } from "next/navigation";
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
  userSongs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ userSongs }) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const subscription = useUserStore((state) => state.subscription);
  const onOpen = useAuthModal((state) => state.onOpen);

  const navigationItems = useMemo(
    () => [
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
    ],
    [pathname],
  );

  function handleSubscribe() {
    if (!user) {
      return onOpen();
    }
    return router.push("/account");
  }

  return (
    <div className="hidden h-full max-h-screen w-[300px] flex-col gap-y-2 p-2 pb-0 md:flex">
      <Box>
        <div className="flex flex-col gap-y-3 px-5 py-4">
          {navigationItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      </Box>
      <Box className="flex h-full flex-col justify-between">
        <SongLibrary userSongs={userSongs} />
        <div className="sticky bottom-0 flex flex-col items-center rounded-tl-lg border-b-8 border-black bg-neutral-900 p-6 pt-4">
          <p className="text-center text-neutral-200">
            {subscription
              ? `Welcome to ${subscription.prices?.products?.name} !`
              : `Subscribe to Premium to access more features (Test Mode)`}
          </p>
          <Button
            className="my-4 w-[150px] bg-white px-4 py-2"
            onClick={handleSubscribe}
          >
            Plans & Billing
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
