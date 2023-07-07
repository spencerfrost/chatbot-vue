

import { PineconeClient } from "@pinecone-database/pinecone";
import { vectorStore } from "./init.js";

import * as dotenv from "dotenv";

dotenv.config();

export async function handleSimilaritySearch(ctx) {
    const { topic } = ctx.request.body;
    const client = new PineconeClient();
    await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
    });

    const results = await vectorStore.similaritySearch(topic, 5);  

    ctx.body = {
        data: results,
    };
}
