import { Metadata } from "next";

import { Header } from "@/components/Header";
import { getSession } from "@/supabase/server";
import getSongsByTitle from "@/supabase/actions/getSongsByTitle";
import SearchInput from "@/components/customInputs/SearchInput";
import SearchContent from "@/components/contents/SearchContent";
import { Footer } from "@/components/footer/Footer";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone - Search",
};

interface SearchProps {
  searchParams: Promise<{ title: string }>;
}

export default async function SearchPage(props: SearchProps) {
  const searchParams = await props.searchParams;
  const session = await getSession();
  const song = await getSongsByTitle(searchParams.title);

  return (
    <div className="flex w-full flex-col">
      <Header
        className="bg-neutral-900"
        session={session}
      />
      <div className="bg-gradient-black w-full flex-1">
        <header className="flex flex-col gap-y-6 px-6 pb-6">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
          <SearchInput />
        </header>
        <SearchContent songs={song} />
      </div>
      <Footer />
    </div>
  );
}
