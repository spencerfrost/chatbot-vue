import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory } from "langchain/memory"; 

import * as dotenv from "dotenv";

dotenv.config();

const questionGeneratorTemplate = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
  For example, if the conversation history is "User: What is the capital of France? AI: The capital of France is Paris.", 
  and the follow up question is "What language do they speak?", the standalone question could be "What language do they speak in Paris, France?".`;

const qaTemplate = `You are a helpful AI assistant.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.

{context}

Question: {question}
Answer in a concise summary:`;

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
    // qaTemplate,
    // questionGeneratorTemplate,
    returnSourceDocuments: true,
    memory: new BufferMemory({
      memoryKey: "chat_history", // Must be set to "chat_history"
      inputKey: "question", // The key for the input to the chain
      outputKey: "text", // The key for the final conversational output of the chain
    }),
  });
}

// Function to initialize Pinecone and QA Chain
export async function initializePinecone() {
  const pineconeIndex = await initPineconeClient();
  vectorStore = await initPineconeStore(pineconeIndex);
  vectorStore.namespace = "default";
  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  chain = initQAChain(model, vectorStore.asRetriever());
}

export { chain, vectorStore };
