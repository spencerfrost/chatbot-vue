import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";

dotenv.config();

export async function handleIndexStats(ctx) {
  try {
    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    const index = client.Index(process.env.PINECONE_INDEX);
    const indexStats = await index.describeIndexStats();
  
    ctx.body = {
      data: indexStats.data,
      state: 1,
    };
  } catch (error) {
    console.error(error);
    ctx.status = error.status || 500;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
  }
}
