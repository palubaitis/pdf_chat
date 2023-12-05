import { getUserById, updateUserById } from "~/models/user.server";
import stripe from "~/stripe.server";

export default async function (user_id: number) {
  let user = await getUserById(user_id);
  let stripeCustomerId = user.subscription_customer;
  if (!stripeCustomerId) {
    let customer = await stripe.customers.create({
      email: user.email,
      metadata: { id: user.id },
    });
    await updateUserById(user.id, { subscription_customer: customer.id });
    stripeCustomerId = customer.id;
  }
  return stripeCustomerId;
}
