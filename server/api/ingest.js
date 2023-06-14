import { addToVectorStore } from "../utils/vector-store.js";
import path from "path";
import os from "os";
import fs from "fs";

export async function handleIngest(ctx) {
  const file = ctx.request.files.file;
  const namespace = ctx.request.body.namespace;

  // Save the uploaded file to a temporary location
  const tempFilePath = path.join(os.tmpdir(), file.originalFilename);
  await fs.promises.copyFile(file.filepath, tempFilePath); // Change this line

  // Now pass the path to the temporary file to addToVectorStore
  await addToVectorStore(tempFilePath, namespace);

  // You can delete the temporary file after you're done with it, if you wish
  await fs.promises.unlink(tempFilePath);

  ctx.body = { status: 'success' };
}

