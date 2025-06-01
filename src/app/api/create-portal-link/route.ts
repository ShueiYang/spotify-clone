import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/supabase/supabaseAdmin";
import { Database } from "@/supabase/database.types";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
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
