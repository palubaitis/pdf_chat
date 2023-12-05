import { ValidatedForm, validationError } from "remix-validated-form";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import SubmitButton from "~/components/submitButton";
import { resetPasswordValidator } from "~/validators/password.validator";
import Input from "~/components/forms/input";
import { deleteTokenAndGetUserId } from "~/models/token.server";
import AuthContainer from "~/components/layout/AuthContainer";
import { changePassword } from "~/models/user.server";

export default function () {
  return (
    <AuthContainer>
      <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Reset your password
        </h2>
      </div>
      <ValidatedForm validator={resetPasswordValidator} method="POST">
        <div className="space-y-6">
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="********"
          />
          <Input
            type="password"
            name="confirm_password"
            label="Confirm password"
            placeholder="********"
          />
        </div>
        <div className="mt-10">
          <SubmitButton label="Reset" />
        </div>
      </ValidatedForm>
    </AuthContainer>
  );
}

export const action: ActionFunction = async ({ request, params }) => {
  const token = params.token as string;
  const data = await request.formData();
  const result = await resetPasswordValidator.validate(data);
  if (result.error) return validationError(result.error);

  const password = result.data.password;
  const userId = await deleteTokenAndGetUserId(token);
  await changePassword(userId as number, password);

  return redirect("/login");
};
