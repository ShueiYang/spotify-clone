"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { createClientSupabaseClient } from "@/supabase/client";
import { ViewType, useAuthModal } from "@/hooks/useAuthModal";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import Button from "@/components/customButtons/Button";

interface HeaderProps {
  session: Session | null;
  className?: string;
}

export default function Header({ session, className }: HeaderProps) {
  const router = useRouter();
  // Zustand custom hook
  const onOpen = useAuthModal((state) => state.onOpen);
  const setView = useAuthModal((state) => state.setView);
  const reset = usePlayerStore((state) => state.reset);

  const handleLogout = async () => {
    const supabase = createClientSupabaseClient();
    const { error } = await supabase.auth.signOut();
    // reset any playing songs
    reset();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully Logged out!");
    }
  };

  const handleOpen = (view: ViewType) => {
    setView(view);
    onOpen();
  };

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
          <RxCaretLeft size={35} className="text-white" />
        </button>
        <button
          // onClick={()=> router.forward()}
          type="button"
          className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75 disabled:pointer-events-none disabled:opacity-50"
          disabled={false}
        >
          <RxCaretRight size={35} className="text-white" />
        </button>
      </div>
      <div className="flex items-center gap-x-2 md:hidden">
        <Link
          href="/"
          className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-70"
        >
          <GoHomeFill size={23} className="text-black" />
        </Link>
        <Link
          href="/search"
          className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-70"
        >
          <BiSearch size={23} className="text-black" />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-x-4">
        {session ? (
          <div className="flex items-center gap-x-4">
            <Button onClick={handleLogout} className="bg-white px-6 py-2">
              Logout
            </Button>
            <Link href="/account">
              <Button className="bg-white">
                <FaUserAlt />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Button
              onClick={() => handleOpen("sign_up")}
              className="whitespace-nowrap bg-transparent px-6 py-2 font-medium text-neutral-300 hover:text-white hover:opacity-100"
            >
              Sign up
            </Button>
            <Button
              onClick={() => handleOpen("sign_in")}
              className="bg-white px-6 py-2"
            >
              Log in
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
