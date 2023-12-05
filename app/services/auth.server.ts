// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { getUserByEmail, type User } from "~/models/user.server";
import { comparePassword } from "~/utils/password";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: "user",
});

import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";

async function login(email: string, password: string): Promise<User> {
  const user = await getUserByEmail(email);
  const match = await comparePassword(password, user.password);
  if (match) return user;
  return {} as User;
}

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");

    if (!email || !password) invariant(false, "Missing email or password");
    let user = await login(email as string, password as string);
    if (!Object.keys(user).length)
      invariant(false, "Invalid email or password");

    return user;
  }),
  "user-pass",
);
