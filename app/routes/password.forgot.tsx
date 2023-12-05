import { Link } from "@remix-run/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Input from "~/components/forms/input";
import SubmitButton from "~/components/submitButton";
import { forgotPasswordValidator } from "~/validators/password.validator";
import { sendForgotPasswordEmail } from "~/utils/emails/forgotPassword";
import AuthContainer from "~/components/layout/AuthContainer";

export default function () {
  return (
    <AuthContainer>
      <div className="mb-4 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Request password reset
        </h2>
        <h4 className="mt-2 text-center text-gray-500 text-normal">
          We'll email you with a link to reset your password.
        </h4>
      </div>

      <ValidatedForm validator={forgotPasswordValidator} method="POST">
        <div className="space-y-6">
          <Input name="email" type="email" label="Email" />
        </div>
        <div className="mt-10">
          <SubmitButton label="Email me" />
        </div>
        <div className="flex gap-1 mt-4 text-base">
          <p className="text-gray-500 text-normal">Remembered your password?</p>
          <Link to="/login" className="font-medium">
            Login
          </Link>
        </div>
      </ValidatedForm>
    </AuthContainer>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const result = await forgotPasswordValidator.validate(data);
  if (result.error) return validationError(result.error);

  const email = result.data.email;
  await sendForgotPasswordEmail(email);

  return redirect("/login");
};
