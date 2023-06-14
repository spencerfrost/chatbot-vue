import Router from "koa-router";
import { chat } from "../api/chat.js";
import { ingestData } from "../api/ingest-data.js";
import { crawlUrl } from "../api/url-crawler.js";

const router = new Router();

router.post("/api/chat", async (ctx) => {
  const data = await chat(ctx);

  ctx.body = {
    data,
    state: 1,
  };
});

router.post("/api/ingest", async (ctx) => {
  const file = ctx.request.files.file;
  const namespace = ctx.request.body.namespace;

  await ingestData(file, namespace);

  ctx.body = {
    state: 1,
  };
});

router.post("/api/crawl", async (ctx) => {
  const { url, namespace } = ctx.request.body;

  await crawlUrl(url, namespace);

  ctx.body = {
    state: 1,
  };
});

export default router;
