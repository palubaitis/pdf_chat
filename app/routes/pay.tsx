import { ActionArgs } from "@remix-run/node";
import { getSession } from "~/services/session.server";
import createCustomer from "~/utils/payment/createCustomer";
import stripe from "~/stripe.server";
import { paymentSuccessUrl, paymentCancelUrl } from "~/config";
import { redirect } from "@remix-run/node";
import { buyValidator } from "~/validators/payment.validator";
import { validationError } from "remix-validated-form";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signup",
  });

  const result = await buyValidator.validate(await request.formData());
  if (result.error) return validationError(result.error);

  const data = result.data;

  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("user").id;
  const customerId = await createCustomer(userId);

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [{ price: data.price_id, quantity: 1 }],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: paymentSuccessUrl,
    cancel_url: paymentCancelUrl,
  });

  console.log(checkoutSession);

  if (!checkoutSession.url) return null;
  return redirect(checkoutSession.url);
}
