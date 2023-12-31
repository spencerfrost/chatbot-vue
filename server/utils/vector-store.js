import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import * as dotenv from "dotenv";

dotenv.config();

// Function to initialize Pinecone client
async function initPineconeClient() {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT
  });
  return client.Index(process.env.PINECONE_INDEX);
}

// Function to split documents
async function splitDocuments(documents) {
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  return await splitter.splitDocuments(documents);
}

// Function to add documents to vector store
export async function addDocumentsToVectorStore(documents) {
  console.log("Adding documents to vector store...");
  console.log("Documents: ", documents)
  const docs = await splitDocuments(documents);
  console.log("Split documents: ", docs)
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
  const pineconeIndex = await initPineconeClient();

  await PineconeStore.fromDocuments(docs, embeddings, { 
    pineconeIndex,
    textKey: "text",
    namespace: process.env.PINECONE_NAMESPACE,
  });
}

// Function to load documents from file and add to vector store
export async function addToVectorStore(filePath) {
  console.log("Initializing loader...");
  console.log("File path: ", filePath);
  const loader = new UnstructuredLoader(filePath, {
    apiKey: process.env.UNSTRUCTURED_API_KEY,
  });
  const rawDocs = await loader.load();
  await addDocumentsToVectorStore(rawDocs);
}
