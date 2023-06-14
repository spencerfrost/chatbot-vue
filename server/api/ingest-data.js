import { addToVectorStore } from "../utils/vector-store.js";

export async function ingestData(file, namespace) {
  await addToVectorStore(file.path, namespace);
}
