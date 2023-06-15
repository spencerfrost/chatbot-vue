import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";
import logger from "koa-logger";
import router from "./routes/routes.js";
import { initializePinecone } from "./api/init.js";

const app = new Koa();

initializePinecone();

app.use(logger());
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(router.routes());

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});