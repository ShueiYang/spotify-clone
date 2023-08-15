import { cookies } from "next/headers";
import { cache } from "react";
import { User, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/database.types";
import { SubscribInfo, Subscription, UserDetails } from "@/types/custom.types";


export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})


export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const { 
      data: sessionData, 
      error: sessionError,
    } = await supabase.auth.getSession();
  
    if(sessionError) {
      console.error(sessionError.message)
      return null
    }
    return sessionData.session  
  } catch (err) {
    console.error("SessionError:", err)
    return null
  }
}

export async function getUser() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user
  } catch (error) {
    console.error("UserError:", error)
    return null
  }
}


export async function getSubscribInfo(user: User | null): Promise<SubscribInfo> {
  if(!user) {
    return {
      userDetails: null,
      subscription: null
    }
  }
  try {
    const subscribInfo = {} as SubscribInfo
    const [userDetailsPromise, subscriptionPromise] = await Promise.allSettled([
      getUserDetails(), 
      getSubscription(),
    ])
    if(userDetailsPromise.status === "fulfilled") {
      subscribInfo.userDetails = userDetailsPromise.value.data as unknown as UserDetails
    }
    if(subscriptionPromise.status === "fulfilled") {
      subscribInfo.subscription = subscriptionPromise.value.data as Subscription
    }
    return subscribInfo;

  } catch (error) {
    console.error("Unexpected getSubscribe error", error)
    return {
      userDetails: null,
      subscription: null
    }
  }
}



function getUserDetails() {
  const supabase = createServerSupabaseClient();
  return supabase.from("users").select("*").single();
}

function getSubscription() {
  const supabase = createServerSupabaseClient();
  return supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .single();
}