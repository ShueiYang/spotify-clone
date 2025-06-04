import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { getUser } from "@/supabase/auth";
import { getSongsByUserId } from "@/supabase/actions/getSongsByUserId";
import { getActiveProductsWithPrices } from "@/supabase/actions/getActiveProductsWithPrices";
import { getSubscriptionInfo } from "@/supabase/subscription";
import { UserProvider } from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { Sidebar } from "@/components/sidebar/Sidebar";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";

const figtree = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone - Home",
  description: "Listen your favorite music!",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  const result = await getSubscriptionInfo(user);

  return (
    <html lang="en">
      <body className={figtree.className}>
        <UserProvider
          user={user}
          subscription={result.subscription}
        >
          <ToasterProvider />
          <ModalProvider products={products} />
          <main className="relative flex h-full">
            <Sidebar userSongs={userSongs} />
            <section className="section-container">{children}</section>
            <MusicPlayer />
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
