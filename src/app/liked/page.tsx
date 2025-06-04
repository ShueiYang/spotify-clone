import { Metadata } from "next";
import Image from "next/image";

import { Header } from "@/components/Header";
import { getSession } from "@/supabase/auth";
import { getFavoriteSongs } from "@/supabase/actions/getLikedSongs";
import LikedContent from "@/components/contents/LikedContent";
import { Footer } from "@/components/footer/Footer";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone - favorite",
};

export default async function LikedPage() {
  const session = await getSession();
  const songs = await getFavoriteSongs(session);

  return (
    <div className="flex w-full flex-col">
      <Header
        className="bg-gradient-to-b from-teal-700 to-teal-700/80"
        session={session}
      />
      <div className="bg-gradient w-full flex-1 pt-10 md:pt-14">
        <header className="flex flex-col items-center gap-x-5 px-6 pb-6 md:flex-row">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <Image
              className="object-cover"
              src="/images/liked.png"
              alt="Playlist"
              fill
              sizes="(max-width: 176px) 100vw"
            />
          </div>
          <div className="mt-4 flex flex-col gap-2 md:mt-0">
            <span className="hidden text-sm font-semibold md:block">
              Playlist
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Favorite Songs
            </h1>
          </div>
        </header>
        <LikedContent songs={songs} />
      </div>
      <Footer />
    </div>
  );
}
