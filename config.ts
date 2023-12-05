import "dotenv/config";
import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  OWN_URL: str(),

  DATABASE_URL: str(),
  DATABASE_AUTH_TOKEN: str(),

  SESSION_SECRET: str(),

  RESEND_API_KEY: str(),
  EMAIL_SENDER: str(),
});

const nodeEnv = env.NODE_ENV;
const ownUrl = env.OWN_URL;
const sessionSecret = env.SESSION_SECRET;
const databaseUrl = env.DATABASE_URL;
const databaseAuthToken = env.DATABASE_AUTH_TOKEN;
const resendApiKey = env.RESEND_API_KEY;
const emailSender = env.EMAIL_SENDER;

export {
  databaseUrl,
  ownUrl,
  databaseAuthToken,
  resendApiKey,
  sessionSecret,
  emailSender,
  nodeEnv,
};
