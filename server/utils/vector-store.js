import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import * as dotenv from "dotenv";

dotenv.config();

export async function addToVectorStore(filePath, namespace) {
  const loader = new UnstructuredLoader(filePath);
  const rawDocs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const docs = await splitter.splitDocuments(rawDocs);
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
  const client = new PineconeClient();
  await client.init({ apiKey: process.env.PINECONE_API_KEY, environment: process.env.PINECONE_ENVIRONMENT });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
  await PineconeStore.fromDocuments(docs, embeddings, { pineconeIndex, textKey: "text", namespace });
}
