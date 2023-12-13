import type { ActionFunction } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { s3UploaderHandler } from "~/utils/handleUpload.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    s3UploaderHandler,
  );

  const fileName = formData.get("upload");

  return {
    filename: fileName,
  };
};
