import { Schema, model } from "mongoose";
import { AnalyticsType, ProductCartItem } from "../../types/analyticsTypes";

const analyticsSchema = new Schema<AnalyticsType>(
  {
    userId: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: [true, "IP address is required"],
      trim: true,
    },
    userAgent: {
      fullData: {
        type: String,
        required: true,
      },
      browser: {
        name: {
          type: String,
          required: true,
        },
        version: {
          type: String,
          required: true,
        },
        major: {
          type: String,
          required: true,
        },
      },
      cpu: {
        architecture: String,
      },
      device: {
        type: { type: String },
        vendor: String,
        model: String,
      },
      engine: {
        name: String,
        version: String,
      },
      os: {
        name: {
          type: String,
          required: true,
        },
        version: String,
      },
    },
    visitStatus: {
      firstVisit: String,
      totalTimeSpent: String,
      isReturning: Boolean,
      lastVisit: String,
    },
    pageViews: [
      {
        url: String,
        timeStamp: {
          type: Date,
          default: Date.now,
        },
        timeSpent: Number,
      },
    ],
    location: {
      country: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      timeZone: {
        type: String,
        required: true,
      },
      coordinates: {
        x: String,
        y: String,
      },
    },
    productsViewed: [
      {
        productId: {
          type: String,
          required: true,
        },
        timeStamps: [
          {
            type: Date,
            default: Date.now,
          },
        ],
      },
    ],
    shoppingCart: {
      items: [
        {
          product: {
            id: {
              type: String,
              required: [true, "Product ID is required"],
            },
            title: {
              type: String,
              required: [true, "Product title is required"],
              trim: true,
            },
            category: {
              type: String,
              required: [true, "Product category is required"],
              enum: ["electronics", "clothing", "home", "beauty", "sports"],
            },
            price: {
              type: Number,
              required: [true, "Product price is required"],
              min: [0, "Price cannot be negative"],
            },
            originalPrice: {
              type: Number,
              required: function (this: ProductCartItem) {
                return this.isOnDiscount;
              },
            },
            isOnDiscount: {
              type: Boolean,
              default: false,
            },
          },
          quantity: {
            type: Number,
            default: 1,
            min: [1, "Quantity cannot be less than 1"],
          },
          addedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    // marketingStuff: {
    //   entryPage: String,
    //   exitPage: String,
    //   referrer: String,
    //   isReturning: Boolean,
    //   discountsUsed: [
    //     {
    //       discountCode: String,
    //       discountAmount: Number,
    //       isPercentage: Boolean,
    //     },
    //   ],
    // },
  },
  {
    timestamps: true,
  }
);

const Analytics = model("Analytics", analyticsSchema);
export default Analytics;
