import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { ValidatedForm } from "remix-validated-form";
import { loginValidator } from "~/validators/user.validator";
import Input from "~/components/forms/input";
import SubmitButton from "~/components/submitButton";
import AuthContainer from "~/components/layout/AuthContainer";
import RememberMe from "~/components/forms/RememberMe";

export default function () {
  return (
    <AuthContainer>
      <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <ValidatedForm method="POST" validator={loginValidator}>
        <div className="flex flex-col gap-4">
          <Input
            name="email"
            label="Email"
            type="email"
            required={true}
            placeholder="john@example.com"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="********"
            required={true}
          />
          <RememberMe />
          <div className="flex gap-1 -mt-4 text-sm">
            <p className="text-gray-500 text-normal">
              <a href="/password/forgot" className="font-medium">
                Forgot password?
              </a>
            </p>
          </div>
          <SubmitButton label="Login" />
        </div>
        <div className="flex gap-1 mt-4 text-sm">
          <p className="text-gray-500 text-sm">
            Don't have an account?
            <a href="/signup" className="font-medium">
              {" "}
              Sign up
            </a>
          </p>
        </div>
      </ValidatedForm>
    </AuthContainer>
  );
}

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
}

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}
