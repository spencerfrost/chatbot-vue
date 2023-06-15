import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { addDocumentsToVectorStore } from "../utils/vector-store.js";

export async function handleGithubRepoLoad(ctx) {
  // Extract the repo URL from the request body
  const repoUrl = ctx.request.body.repo;

  // Create a new GithubRepoLoader with the repo URL and options
  const loader = new GithubRepoLoader(repoUrl, {
    branch: "main",
    recursive: false,
    unknown: "error",
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
  });

  try {
    // Load the documents from the Github repo
    const documents = await loader.load();

    // Add the documents to the vector store
    await addDocumentsToVectorStore(documents);

    // Send a successful response with the documents
    ctx.body = {
      data: documents,
      state: 1,
    };
  } catch (error) {
    // Log the error and send an error response
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      error: 'Failed to load Github Repo',
    };
  }
}
