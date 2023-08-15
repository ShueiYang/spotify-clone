import "./globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"

import { getUser, getSubscribInfo } from "@/supabase/server";
import getSongsByUserId from "@/supabase/actions/getSongsByUserId";

import Sidebar from "@/components/sidebar/Sidebar"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider";
import StoreInitializer from "@/providers/UserProvider";
import MusicPlayer from "@/components/musicPlayer/indexBar";
import getActiveProductsWithPrices from "@/supabase/actions/getActiveProductsWithPrices";

const figtree = Figtree({ subsets: ["latin"] })

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone - Home",
  description: "Listen your favorite music!",
}


export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const session = await getSession();
  const user = await getUser();
  const result = await getSubscribInfo(user);
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  // const accessToken = session?.access_token ?? null;

  
  return (
    <html lang="en">
      <body className={figtree.className}>
        <StoreInitializer 
          // session={session} 
          user={user}
          userDetails={result.userDetails}
          subscription={result.subscription}
        />
        <ToasterProvider />
        <ModalProvider products={products} />
        <main className="relative flex h-full">
          <Sidebar userSongs={userSongs} />
          <section className="section-container">
            {children}
          </section>
          <MusicPlayer/>
        </main>
      </body>
    </html>
  )
};