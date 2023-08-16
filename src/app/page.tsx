import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import ListItem from "@/components/ListItem";
import HomeContent from "@/components/contents/HomeContent";
import { getSession } from "@/supabase/server";
import getSongs from "@/supabase/actions/getSongs";


export const revalidate = 0;

export default async function Home() {

  const session = await getSession();
  const songs = await getSongs();
  
  return (
    <div className="flex flex-col h-full">
      <Header
        className="bg-gradient-to-b from-teal-700 to-teal-700/80" 
        session={session} 
      />
      <div className="bg-gradient flex-1 w-full">
        <header className="px-6 pb-6">
          <h1 className="text-3xl text-white font-semibold">
            Welcome back
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem 
              image="/images/liked.png"
              name="Liked Songs"
              href="/liked"
            />
          </div>
        </header>    
        <div className="mt-4 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-white font-semibold">
              Spotify Playlists
            </h2>
          </div>
          <div>
            <HomeContent songs={songs}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}