import { ActionArgs, json } from "@remix-run/node";
import "dotenv/config";
import { getUserByCustomerId, updateUserById } from "~/models/user.server";
import stripe, { stripeSigningSecret } from "~/stripe.server";

const badStatuses = ["incomplete", "incomplete_expired", "canceled"];

export const action = async ({ request }: ActionArgs) => {
  const sig = request.headers.get("stripe-signature") as string;

  let event;
  const payload = await request.text();
  try {
    event = stripe.webhooks.constructEvent(payload, sig, stripeSigningSecret);
  } catch (err) {
    return new Response("Invalid server error", {
      status: 400,
    });
  }

  let user;
  switch (event.type) {
    case "customer.subscription.updated":
    case "customer.subscription.created":
      let updated: any = event.data.object;

      let previousStatus = updated?.previous_attributes?.status;
      let currentStatus = updated?.status;

      if (
        badStatuses.includes(previousStatus) ||
        badStatuses.includes(currentStatus)
      ) {
        return json({
          subscriptionChanged: false,
          error: "Incomplete payment.",
        });
      }

      user = await getUserByCustomerId(updated.customer);

      const update = {
        subscription_id: updated.id,
        subscription_price: updated.plan.amount / 100,
        subscription_will_renew: !updated.cancel_at_period_end,
      };
      await updateUserById(user.id, update);

      return json({
        subscriptionChanged: true,
      });
    case "customer.subscription.deleted":
      let deleted: any = event.data.object;

      user = await getUserByCustomerId(deleted.customer);
      await updateUserById(user.id, {
        subscription_id: null,
        subscription_price: 0,
        subscription_will_renew: null,
      });

      return json({
        subscriptionChanged: true,
      });
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  return json({
    subscriptionChanged: false,
  });
};
