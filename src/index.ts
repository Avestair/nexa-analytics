import { Elysia } from "elysia";
import { connectToDB } from "./config/db";
connectToDB();
const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
