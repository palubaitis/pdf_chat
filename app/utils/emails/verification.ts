import { createToken } from "~/models/token.server";
import { ownUrl } from "config";
import sendEmail from "./send";

function generateVerificationUrl(token: string) {
  return `${ownUrl}/email/verify/${token}`;
}

export async function sendVerificationEmail(user_id: number, email: string) {
  const token = await createToken({
    user_id,
    type: "verify",
  });

  const url = generateVerificationUrl(token.id);

  await sendEmail({
    to: email,
    subject: "Verify your email",
    text: `Click this link to verify your email: ${url}`,
  });
}
