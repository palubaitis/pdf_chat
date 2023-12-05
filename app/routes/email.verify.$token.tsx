import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { verifyEmailByToken } from "~/models/token.server";
import { redirect } from "@remix-run/node";

export default function () {
  useLoaderData<typeof loader>();
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold">Error - could not verify email</h1>
    </div>
  );
}

export async function loader({ request, params }: LoaderArgs) {
  const token = params.token as string;
  const result = await verifyEmailByToken(token);
  if (result) return redirect("/login");
  return null;
}
