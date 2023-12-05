import { createToken } from "~/models/token.server";
import { ownUrl } from "config";
import sendEmail from "./send";
import { getUserByEmail } from "~/models/user.server";

function generateForgotPasswordUrl(token: string) {
  return `${ownUrl}/password/reset/${token}`;
}

export async function sendForgotPasswordEmail(email: string) {
  const user = await getUserByEmail(email);

  const token = await createToken({
    user_id: user.id,
    type: "reset",
  });

  const url = generateForgotPasswordUrl(token.id);

  await sendEmail({
    to: email,
    subject: "Forgot your password?",
    text: `Click this link to reset your password: ${url}`,
  });
}
