import { Header } from "@/components/Header";
import { getUser } from "@/supabase/auth";
import { getSongs } from "@/supabase/actions/getSongs";
import ListItem from "@/components/ListItem";
import HomeContent from "@/components/contents/HomeContent";
import { Footer } from "@/components/footer/Footer";

export const revalidate = 0;

export default async function Home() {
  const authUser = await getUser();
  const songs = await getSongs();

  return (
    <div className="flex w-full flex-col">
      <Header
        className="bg-linear-to-b from-teal-700 to-teal-700/80"
        authUser={authUser}
      />
      <div className="bg-gradient w-full flex-1">
        <header className="px-6 pb-6">
          <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="/liked"
            />
          </div>
        </header>
        <div className="mt-4 mb-7 px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Spotify Playlists
            </h2>
          </div>
          <div>
            <HomeContent songs={songs} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
