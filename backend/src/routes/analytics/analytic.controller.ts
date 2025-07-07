import { AnalyticsType } from "../../types/analyticsTypes";
import Analytics from "./analytics.model";

export const AnalyticsController = {
  // Create analytics record
  create: async (analyticsData: AnalyticsType) => {
    try {
      const newAnalytics = new Analytics(analyticsData);
      await newAnalytics.save();
      return {
        success: true,
        message: "Analytics record created successfully",
        data: newAnalytics,
      };
    } catch (error) {
      console.error("Error creating analytics record:", error);
      throw error;
    }
  },

  // Get all analytics records
  getAll: async (skip: number, limit: number) => {
    try {
      const analytics = await Analytics.find().skip(skip).limit(limit).lean();

      return {
        success: true,
        message: "Analytics records retrieved successfully",
        data: analytics,
      };
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  },

  // Get analytics by userId
  getByUserId: async (userId: string) => {
    try {
      const analytics = await Analytics.find({ userId });
      return {
        success: true,
        message: "User analytics retrieved successfully",
        data: analytics,
      };
    } catch (error) {
      console.error("Error fetching user analytics:", error);
      throw error;
    }
  },
};
