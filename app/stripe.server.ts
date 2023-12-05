import Stripe from "stripe";
import "dotenv/config";

if (!process.env.STRIPE_SK) {
  throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2023-08-16",
});

export const stripeSigningSecret = process.env.STRIPE_WSS as string;

export default stripe;
