import Header from "@/components/Header";
import SearchContent from "@/components/contents/SearchContent";
import SearchInput from "@/components/customInputs/SearchInput";
import getSongsByTitle from "@/supabase/actions/getSongsByTitle";
import { getSession } from "@/supabase/server";

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string }
};

export default async function Search({searchParams}: SearchProps) {

  const session = await getSession();
  const song = await getSongsByTitle(searchParams.title);

  return (
    <div className="flex flex-col h-full">
      <Header 
        className="bg-neutral-900"
        session={session}
      />
      <div className="bg-neutral-900 flex-1 w-full rounded-b-lg">
        <div className="flex flex-col gap-y-6 px-6 pb-6">
          <h1 className="text-3xl text-white font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>  
        <SearchContent songs={song}/>  
      </div>  
    </div>
  )
}
