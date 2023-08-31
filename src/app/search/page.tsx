import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import SearchContent from "@/components/contents/SearchContent";
import SearchInput from "@/components/customInputs/SearchInput";
import getSongsByTitle from "@/supabase/actions/getSongsByTitle";
import { getSession } from "@/supabase/server";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone - Search",
}

interface SearchProps {
  searchParams: { title: string }
};

export default async function SearchPage({searchParams}: SearchProps) {

  const session = await getSession();
  const song = await getSongsByTitle(searchParams.title);

  return (
    <div className="flex flex-col w-full">
      <Header 
        className="bg-neutral-900"
        session={session}
      />
      <div className="bg-gradient-black flex-1 w-full">
        <header className="flex flex-col gap-y-6 px-6 pb-6">
          <h1 className="text-3xl text-white font-semibold">
            Search
          </h1>
          <SearchInput />
        </header>  
        <SearchContent songs={song}/>  
      </div> 
      <Footer /> 
    </div>
  )
}
