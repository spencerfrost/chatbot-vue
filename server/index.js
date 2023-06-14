import Koa from "koa";
import { koaBody } from "koa-body";
import router from "./routes/routes.js";

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes());

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
