import Router from "koa-router";
import { handleChat } from "../api/chat.js";
import { handleIngest } from "../api/ingest.js";
import { handleCrawl } from "../api/crawl.js";
import { handleIndexStats } from "../api/indexStats.js";
import { handleGithubRepoLoad } from "../api/readRepo.js";
import { handleSimilaritySearch } from "../api/similaritySearch.js";

const router = new Router();

router.post("/api/chat", handleChat);
router.post("/api/ingest", handleIngest);
router.post("/api/crawl", handleCrawl);
router.get("/api/index-stats", handleIndexStats);
router.post("/api/github", handleGithubRepoLoad);
router.post("/api/similarity-search", handleSimilaritySearch);

export default router;
