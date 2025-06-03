"use client";

import { useEffect } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";

import { createClientSupabaseClient } from "@/supabase/client";
import { ViewType, useAuthModal } from "@/hooks/useAuthModal";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { useUserStore } from "@/hooks/useUserStore";
import { SvgIcon } from "./svg/SvgIcon";
import Button from "@/components/customButtons/Button";

interface HeaderProps {
  session: Session | null;
  className?: string;
}

export function Header({ session, className }: HeaderProps) {
  const router = useRouter();

  // --- Zustand custom hook ---

  const onOpen = useAuthModal((state) => state.onOpen);
  const setView = useAuthModal((state) => state.setView);
  const reset = usePlayerStore((state) => state.reset);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const resetUserSession = useUserStore((state) => state.reset);

  // --- effects ---

  useEffect(
    function syncUserFromSession() {
      if (session?.user && !user) {
        setUser(session.user);
      } else if (!session && user) {
        resetUserSession();
      }
    },
    [session, user, setUser, resetUserSession],
  );

  // --- handlers ---

  async function handleLogout() {
    const supabase = createClientSupabaseClient();
    const { error } = await supabase.auth.signOut();
    // reset any playing songs state
    reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully Logged out!");
    }
  }

  function handleOpen(view: ViewType) {
    setView(view);
    onOpen();
  }

  return (
    <nav
      className={twMerge(
        `sticky top-0 z-10 flex h-fit w-full items-center justify-between rounded-t-lg p-6 pb-4 backdrop-blur-[2px]`,
        className,
      )}
    >
      <div className="hidden items-center gap-x-2 md:flex">
        <button
          // onClick={()=> router.back()}
          type="button"
          className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75 disabled:pointer-events-none disabled:opacity-50"
          disabled={false}
        >
          <SvgIcon
            name="ChevronLeft"
            size={35}
            className="p-1 text-white"
          />
        </button>
        <button
          // onClick={()=> router.forward()}
          type="button"
          className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75 disabled:pointer-events-none disabled:opacity-50"
          disabled={false}
        >
          <SvgIcon
            name="ChevronRight"
            size={35}
            className="p-1 text-white"
          />
        </button>
      </div>
      <div className="flex items-center gap-x-2 md:hidden">
        <Link
          href="/"
          className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-70"
        >
          <SvgIcon
            name="House"
            size={23}
            className="text-black"
          />
        </Link>
        <Link
          href="/search"
          className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-70"
        >
          <SvgIcon
            name="Search"
            size={23}
            className="text-black"
          />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-x-4">
        {session ? (
          <div className="flex items-center gap-x-4">
            {session.user.user_metadata.name && (
              <span className="whitespace-nowrap">
                {session.user.user_metadata.name}
              </span>
            )}
            <Link href="/account">
              <Button className="bg-white">
                <SvgIcon name="User" />
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              className="bg-white px-6 py-2"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={() => handleOpen("sign_in")}
              className="bg-white px-6 py-2"
            >
              Log in
            </Button>
            <Button
              onClick={() => handleOpen("sign_up")}
              className="whitespace-nowrap bg-transparent px-6 py-2 font-medium text-neutral-300 hover:text-white hover:opacity-100"
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
