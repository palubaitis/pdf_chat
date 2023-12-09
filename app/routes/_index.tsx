import type { V2_MetaFunction } from "@remix-run/node";
import Pricing from "~/components/Pricing";
import Header from "~/components/layout/Header";
import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { Button } from "@/components/ui/button"

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  return (
    <main>
      <Header />
      <div className="items-center flex flex-col mt-40 gap-5">
        <h1 className="text-6xl tracking-tight font-extrabold">
          Don't waste time on boilerplate code.
        </h1>
        <Button>fgdfg</Button>
        <h2 className="text-gray-700 text-2xl tracking-tight">
          remix-saas is the only template you need.
        </h2>
      </div>
      <div>
        <Pricing />
      </div>
    </main>
  );
}

export async function loader({ request }: LoaderArgs) {
  let user = await authenticator.isAuthenticated(request);
  return json(user);
}
