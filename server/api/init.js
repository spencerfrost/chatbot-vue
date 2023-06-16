import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import * as dotenv from "dotenv";

dotenv.config();

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.

{context}

Question: {question}
Helpful answer in markdown:`;

let chain, vectorStore;

// Function to initialize Pinecone client
async function initPineconeClient() {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT
  });
  return client.Index(process.env.PINECONE_INDEX);
}

// Function to initialize Pinecone store
async function initPineconeStore(pineconeIndex) {
  return await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
    { pineconeIndex, textKey: "text" }
  );
}

// Function to initialize Conversational Retrieval QA Chain
function initQAChain(model, retriever) {
  return ConversationalRetrievalQAChain.fromLLM(model, retriever, {
    qaTemplate: QA_PROMPT,
    questionGeneratorTemplate: CONDENSE_PROMPT,
    returnSourceDocuments: true
  });
}

// Function to initialize Pinecone and QA Chain
export async function initializePinecone() {
  const pineconeIndex = await initPineconeClient();
  vectorStore = await initPineconeStore(pineconeIndex);
  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY
  });
  chain = initQAChain(model, vectorStore.asRetriever());
}

export { chain };
