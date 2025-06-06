import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/supabase/utils/server";
import { createOrRetrieveCustomer } from "@/supabase/supabaseAdmin";
import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";

export async function POST(request: Request) {
  try {
    const { price, quantity = 1, metadata = {} } = await request.json();

    const supabase = await createServerSupabaseClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 3,
        metadata,
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: unknown) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
