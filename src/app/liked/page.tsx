import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import LikedContent from "@/components/contents/LikedContent";
import getFavoriteSongs from "@/supabase/actions/getLikedSongs";
import { getSession } from "@/supabase/server";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone - favorite",
}

export default async function LikedPage() {

  const session = await getSession();
  const songs = await getFavoriteSongs(session);

  return (
    <div className="flex flex-col h-full">
      <Header
        className="bg-gradient-to-b from-teal-700 to-teal-700/80"
        session={session}
      />
      <div className="bg-gradient flex-1 w-full pt-10 md:pt-14">
        <header className="flex flex-col md:flex-row items-center gap-x-5 px-6 pb-6">
          <div className="relative h-32 w-32 lg:w-44 lg:h-44">
            <Image
              className="object-cover"
              src="/images/liked.png"
              alt="Playlist"
              fill
              sizes="(max-width: 176px) 100vw"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4 md:mt-0">
            <span className="hidden md:block font-semibold text-sm">
              Playlist
            </span>
            <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold">
              Favorite Songs
            </h1>
          </div>
        </header>  
        <LikedContent songs={songs} />
      </div>
      <Footer />
    </div>
  )
}
