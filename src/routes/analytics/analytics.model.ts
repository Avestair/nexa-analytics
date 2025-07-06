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
      fullData: String,
      browser: {
        name: String,
        version: String,
        major: String,
      },
      cpu: {
        architecture: String,
      },
      device: {
        type: String,
        vendor: String,
        model: String,
      },
      engine: {
        name: String,
        version: String,
      },
      os: {
        name: String,
        version: String,
      },
    },
    visitStatus: {
      firstVisit: String,
      totalTimeSpent: String,
      isReturning: Boolean, //check the last visit with date.now to see if its over 1 month if its was set this field to true otherwise false
      lastVisit: String,
    },
    pageViews: [
      {
        url: String,
        timeStamp: {
          type: Date,
          default: Date.now,
        },
        timeSpent: Number, // in seconds
      },
    ],
    location: {
      country: String,
      region: String,
      city: String,
      timeZone: String,
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
  },
  {
    timestamps: true,
  }
  // marketingStuff: {
  //   entryPage: String,
  //   exitPage: String,
  //   referrer: String, // Where they came from
  //   isReturning: Boolean,
  //    discountsUsed: [
  // {
  //   discountCode: String,
  //   discountAmount: Number,
  //   isPercentage: Boolean,

  // }
  // ]
  // },
);

const Analytics = model("Analytics", analyticsSchema);
export default Analytics;
