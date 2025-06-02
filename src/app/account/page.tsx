import Header from "@/components/Header";
import AccountContent from "@/components/contents/AccountContent";
import Footer from "@/components/footer/Footer";
import { getSession, getSubscribInfo } from "@/supabase/server";

export default async function Accountpage() {
  const session = await getSession();
  const result = await getSubscribInfo(session?.user ?? null);

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        className="bg-neutral-900"
        session={session}
      />
      <div className="bg-gradient-black w-full flex-1">
        <header className="flex flex-col gap-y-6 px-6 pb-6">
          <h1 className="text-3xl font-semibold text-white">
            Account Settings
          </h1>
        </header>
        <AccountContent subscription={result.subscription} />
      </div>
      <Footer />
    </div>
  );
}
