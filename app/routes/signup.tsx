import { ValidatedForm, validationError } from "remix-validated-form";
import Input from "~/components/forms/input";
import SubmitButton from "~/components/submitButton";
import { ActionArgs } from "@remix-run/node";
import { createUser } from "~/models/user.server";
import { signupValidator } from "~/validators/user.validator";
import { authenticator } from "~/services/auth.server";
import { sendVerificationEmail } from "~/utils/emails/verification";
import { getSession, commitSession } from "~/services/session.server";
import { redirect } from "@remix-run/node";
import AuthContainer from "~/components/layout/AuthContainer";
import RememberMe from "~/components/forms/RememberMe";
import { LoaderArgs } from "@remix-run/node";

export default function () {
  return (
    <AuthContainer>
      <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 ">
          Sign up for an account
        </h2>
      </div>
      <ValidatedForm method="POST" validator={signupValidator}>
        <div className="space-y-6">
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.org"
            required={true}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="********"
            required={true}
          />
          <Input
            name="confirm_password"
            label="Confirm password"
            type="password"
            placeholder="********"
            required={true}
          />
          <RememberMe />
          <SubmitButton label="Sign up" />
        </div>
        <div className="flex gap-1 mt-4 text-sm">
          <p className="text-gray-500 text-sm">
            Already have an account?
            <a href="/login" className="font-medium">
              {" "}
              Login instead
            </a>
          </p>
        </div>
      </ValidatedForm>
    </AuthContainer>
  );
}

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
  return null;
}

export async function action({ request }: ActionArgs) {
  const result = await signupValidator.validate(await request.formData());
  if (result.error) return validationError(result.error);

  const data = result.data;
  const user = await createUser(data.email, data.password);

  await sendVerificationEmail(user.id, data.email);

  let session = await getSession(request.headers.get("cookie"));
  session.set(authenticator.sessionKey, user);

  return redirect("/email/verify", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
