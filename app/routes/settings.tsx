import { authenticator } from "~/services/auth.server";
import { LoaderArgs } from "@remix-run/node";
import Header from "~/components/layout/Header";
import { getSession } from "~/services/session.server";
import { getUserById } from "~/models/user.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export default function () {
  const user = useLoaderData<typeof loader>();
  let isPaid = user.subscription_price && user.subscription_price > 0;

  return (
    <>
      <Header />
      <main className="max-w-6xl m-auto mt-10">
        <h1 className="text-5xl font-semibold">Settings</h1>
        {isPaid ? (
          <>
            <h1>You have a paid plan.</h1>
          </>
        ) : (
          <>
            <h1>Visit the pricing page to buy a paid plan.</h1>
          </>
        )}
      </main>
    </>
  );
}

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("user").id;
  const user = await getUserById(userId);

  return json(user);
}
