import { getSession } from "~/services/session.server";

export default async function isAuthenticated(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  return session && session.id;
}
