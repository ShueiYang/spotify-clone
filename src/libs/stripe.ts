import Stripe from "stripe";

import packageJson from "../../package.json";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
  appInfo: {
    name: "Spotify Clone by Shueiyang",
    version: packageJson.version,
  },
});
