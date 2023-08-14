import { loadStripe, Stripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>

export function getStripe() {
  if(!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STROPE_PUBLISHABLE_KEY ?? ""
    )
  }
  return stripePromise;
}