import "dotenv/config";

export const ownUrl = process.env.OWN_URL as string;
export const paymentSuccessUrl = (ownUrl +
  process.env.PAYMENT_SUCCESS_URL) as string;
export const paymentCancelUrl = (ownUrl +
  process.env.PAYMENT_CANCEL_URL) as string;

export const plans = [
  {
    name: "Premium",
    description: "Unlock thousands of leads today.",
    price: "$99",
    benefits: [
      "Individual configuration",
      "24/7 support",
      "Free updates",
      "Access to 1000+ leads",
    ],
    price_id: "price_1NmEDZCV29VHCpvwYjvj59d5",
  },
];
