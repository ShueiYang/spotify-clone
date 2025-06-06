import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export function getStripe() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!key) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing.");
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}
