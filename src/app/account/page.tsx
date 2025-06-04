import { Header } from "@/components/Header";
import { getUser } from "@/supabase/auth";
import { getSubscriptionInfo } from "@/supabase/subscription";
import AccountContent from "@/components/contents/AccountContent";
import { Footer } from "@/components/footer/Footer";

export default async function Accountpage() {
  const authUser = await getUser();
  const result = await getSubscriptionInfo(authUser ?? null);

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        className="bg-neutral-900"
        authUser={authUser}
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
