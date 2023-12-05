import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { MIN_PASSWORD_LENGTH } from "./config";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const forgotPasswordValidator = withZod(forgotPasswordSchema);

const resetPasswordSchema = z
  .object({
    password: z.string().min(MIN_PASSWORD_LENGTH),
    confirm_password: z.string().min(MIN_PASSWORD_LENGTH),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export const resetPasswordValidator = withZod(resetPasswordSchema);
