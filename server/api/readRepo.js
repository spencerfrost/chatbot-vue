import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { addDocumentsToVectorStore } from "../utils/vector-store.js";

export async function handleGithubRepoLoad(ctx) {
  const { url } = ctx.request.body;
  
  try {
    const loader = new GithubRepoLoader(url, {
      branch: "main",
      recursive: false,
      unknown: "warn",
      ignorePaths: ["*.md"],
      accessToken: process.env.GITHUB_ACCESS_TOKEN
    });
    const docs = await loader.load();
    console.log({ docs });

    // Add the documents to the vector store
    await addDocumentsToVectorStore(docs);

    // Send a successful response with the documents
    ctx.body = {
      data: docs,
      state: 1,
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      error,
    };
  }
}
