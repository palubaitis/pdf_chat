import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

const fileUploadSchema = z.object({
  file: z.any(),
});

const createFileSchema = z.object({});

export const createFileValidator = withZod(createFileSchema);
export const createChatbotValidator = withZod(fileUploadSchema);
