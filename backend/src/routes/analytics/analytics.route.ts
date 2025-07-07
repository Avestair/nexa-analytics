import { Elysia } from "elysia";
import { AnalyticsController } from "./analytic.controller";
import { AnalyticsType } from "../../types/analyticsTypes";

export const analyticsRoutes = new Elysia({ prefix: "/analytics" })
  .post("/", async ({ body }) => {
    try {
      const result = await AnalyticsController.create(body as AnalyticsType);
      return result;
    } catch (error) {
      return {
        success: false,
        message: "Failed to create analytics record",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .get("/", async ({ query }) => {
    try {
      const skip = Number(query.skip) || 0;
      const limit = Number(query.limit) || 150;
      return await AnalyticsController.getAll(skip, limit);
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch analytics records",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .get("/:userId", async ({ params }) => {
    try {
      return await AnalyticsController.getByUserId(params.userId);
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch user analytics",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });
