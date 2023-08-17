"use client"

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { GoHomeFill } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { createClientSupabaseClient } from "@/supabase/client";
import { ViewType, useAuthModal } from "@/hooks/useAuthModal";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import Button from "@/components/customButtons/Button";

interface HeaderProps {
  session: Session | null 
  className?: string
}


const Header = ({ session, className }: HeaderProps) => {
  
  const router = useRouter();
  // Zustand custom hook
  const onOpen = useAuthModal((state) => state.onOpen)
  const setView = useAuthModal((state) => state.setView)
  const reset = usePlayerStore((state) => state.reset)
  
  const handleLogout = async () => {
    const supabase = createClientSupabaseClient();
    const { error } = await supabase.auth.signOut();
    // reset any playing songs
    reset();
    router.refresh();
    if(error) {
      toast.error(error.message)   
    } else {
      toast.success("Successfully Logged out!")
    }
  }
  
  const handleOpen = (view: ViewType) => {
    setView(view)
    onOpen()
  }

  return (
    <nav 
      className={twMerge(`sticky w-full top-0 h-fit flex items-center justify-between p-6 pb-4 rounded-t-lg z-10 backdrop-blur-[2px]`,
        className
      )}
    >
      <div className="hidden md:flex gap-x-2 items-center">
        <button 
          // onClick={()=> router.back()}
          className="flex items-center justify-center rounded-full bg-black hover:opacity-75 transition disabled:pointer-events-none disabled:opacity-50"
          disabled={false}
        >
          <RxCaretLeft size={35} className="text-white"/>
        </button>
        <button
          // onClick={()=> router.forward()}
          className="flex items-center justify-center rounded-full bg-black hover:opacity-75 transition disabled:pointer-events-none disabled:opacity-50"
          disabled={false}
        >
          <RxCaretRight size={35} className="text-white"/>
        </button>
      </div>
      <div className="flex md:hidden gap-x-2 items-center">
        <Link 
          href="/"
          className="flex items-center bg-white rounded-full p-2 justify-center hover:opacity-70 transition"   
        >
          <GoHomeFill size={23} className="text-black" />
        </Link>
        <Link 
          href="/search"
          className="flex items-center bg-white rounded-full p-2 justify-center hover:opacity-70 transition"
        >
          <BiSearch size={23} className="text-black" />
        </Link>
      </div>
      <div className="flex justify-between items-center gap-x-4">
      {session ? (
        <div className="flex gap-x-4 items-center">
          <Button
            onClick={handleLogout}
            className="bg-white px-6 py-2"
          >
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
            onClick={()=> handleOpen("sign_up")} 
            className="bg-transparent text-neutral-300 font-medium px-6 py-2 whitespace-nowrap hover:opacity-100 hover:text-white"
          >
            Sign up
          </Button>
          <Button 
            onClick={()=> handleOpen("sign_in")}
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

export default Header;