import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { MIN_PASSWORD_LENGTH } from "./config";

const createUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH),
    confirm_password: z.string().min(MIN_PASSWORD_LENGTH),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export const signupValidator = withZod(createUserSchema);

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
});

export const loginValidator = withZod(loginUserSchema);
