import "./globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"

import { getUser } from "@/supabase/server";
import getSongsByUserId from "@/supabase/actions/getSongsByUserId";
import getActiveProductsWithPrices from "@/supabase/actions/getActiveProductsWithPrices";

import Sidebar from "@/components/sidebar/Sidebar"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider";
import StoreInitializer from "@/providers/UserProvider";
import MusicPlayer from "@/components/musicPlayer/indexBar";

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
  const user = await getUser();
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  
  return (
    <html lang="en">
      <body className={figtree.className}>
        <StoreInitializer 
          user={user}
          userDetails={null}
          subscription={null}
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