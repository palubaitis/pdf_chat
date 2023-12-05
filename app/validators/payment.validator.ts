import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

const buySchema = z.object({
  price_id: z.string().startsWith("price_"),
});

export const buyValidator = withZod(buySchema);
