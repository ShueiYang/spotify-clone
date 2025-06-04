import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/supabase/utils/server";
import { createOrRetrieveCustomer } from "@/supabase/supabaseAdmin";
import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw { status: 400, message: "Could not get user" };
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id,
      email: user.email ?? "",
    });

    if (!customer) {
      throw { status: 400, message: "Could not get customer" };
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`,
    });

    return NextResponse.json({ url });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json(`Create Portal-link Error: ${err.message}`, {
        status: 400,
      });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
