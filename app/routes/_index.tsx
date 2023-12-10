import type { V2_MetaFunction } from "@remix-run/node";
import Header from "~/components/layout/Header";
import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { Button } from "@/components/ui/button";
import FileUpload from "~/components/FileUpload";
import { useLoaderData } from "@remix-run/react";
export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const isAuthenticated = useLoaderData<typeof loader>();
  return (
    <main>
      <Header />
      <div className="bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
              {/* <UserButton afterSignOutUrl="/" /> */}
            </div>
            <div className="flex mt-2"></div>
            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of students, researchers and professionals to
              instantly answer questions and understand research with AI
            </p>
            <div className="w-full mt-4">
              {isAuthenticated ? <FileUpload /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function loader({ request }: LoaderArgs) {
  let user = await authenticator.isAuthenticated(request);
  return json(user);
}
