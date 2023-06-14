import { chain } from "./init.js";

export async function handleChat(ctx) {
  const { message, history } = ctx.request.body;

  const response = await chain.call({
    question: message,
    chat_history: history || [],
  });

  ctx.body = response
}
