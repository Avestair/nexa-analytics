import { connectToDB } from "./config/db";
import { analyticsRoutes } from "./routes/analytics/analytics.route";
import { app } from "./utils/utils";

connectToDB();

app.get("/", "hello world").use(analyticsRoutes).listen(5100);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
