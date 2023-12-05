import { Resend } from "resend";
import { emailSender, resendApiKey } from "config";

const resend = new Resend(resendApiKey);

type Email = {
  to: string;
  subject: string;
  text: string;
};

export default async function sendEmail(email: Email) {
  await resend.emails.send({
    from: emailSender,
    to: email.to,
    subject: email.subject,
    text: email.text,
  });
}
