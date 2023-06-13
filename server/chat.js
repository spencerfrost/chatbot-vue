  import { OpenAI, OpenAIChat } from "langchain/llms/openai";
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

  const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say you don't know. DO NOT try to make up an answer.

    The State of the Union

    Question: {question}
    Helpful answer in markdown:`;

  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  let chain, vectorStore;

  async function initializePinecone() {
    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

    vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      }),
      {
        pineconeIndex: pineconeIndex,
        textKey: "text",
        namespace: "state-of-the-union",
      }
    );

    chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_PROMPT,
        questionGeneratorTemplate: CONDENSE_PROMPT,
        returnSourceDocuments: true,
      }
    );
  }

  initializePinecone();

  export async function chat(ctx) {
    const { message, history } = ctx.request.body;

    const response = await chain.call({
      question: message,
      chat_history: history || [],
    });

    return response;
  }
