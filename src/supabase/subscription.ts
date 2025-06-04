import { User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/supabase/utils/server";
import { SubscribInfo, Subscription, UserDetails } from "@/types/custom.types";

export async function getSubscriptionInfo(
  user: User | null,
): Promise<SubscribInfo> {
  if (!user) {
    return {
      userDetails: null,
      subscription: null,
    };
  }
  try {
    const subscribInfo = {} as SubscribInfo;
    const [userDetailsPromise, subscriptionPromise] = await Promise.allSettled([
      getUserDetails(),
      getSubscription(),
    ]);

    if (userDetailsPromise.status === "fulfilled") {
      subscribInfo.userDetails = userDetailsPromise.value
        .data as unknown as UserDetails;
    }
    if (subscriptionPromise.status === "fulfilled") {
      subscribInfo.subscription = subscriptionPromise.value
        .data as Subscription;
    }
    return subscribInfo;
  } catch (err) {
    console.error("Unexpected getSubscribe error", err);
    return {
      userDetails: null,
      subscription: null,
    };
  }
}

async function getUserDetails() {
  const supabase = await createServerSupabaseClient();
  return supabase.from("users").select("*").single();
}

async function getSubscription() {
  const supabase = await createServerSupabaseClient();
  return supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .single();
}
