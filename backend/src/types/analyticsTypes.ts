export type ProductCartItem = {
  id: string;
  title: string;
  category: "electronics" | "clothing" | "home" | "beauty" | "sports";
  price: number;
  originalPrice?: number;
  isOnDiscount: boolean;
};

export type UserAgent = {
  fullData: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  cpu?: {
    architecture?: string;
  };
  device?: {
    type?: string;
    vendor?: string;
    model?: string;
  };
  engine?: {
    name?: string;
    version?: string;
  };
  os: {
    name: string;
    version?: string;
  };
};

export type VisitStatus = {
  firstVisit?: string;
  totalTimeSpent?: string;
  isReturning?: boolean;
  lastVisit?: string;
};

export type PageView = {
  url?: string;
  timeStamp?: Date;
  timeSpent?: number;
};

export type Location = {
  country: string;
  region: string;
  city: string;
  timeZone: string;
  coordinates?: {
    x?: string;
    y?: string;
  };
};

export type ProductViewed = {
  productId: string;
  timeStamps: Date[];
};

export type CartItem = {
  product: ProductCartItem;
  quantity: number;
  addedAt: Date;
};

export type ShoppingCart = {
  items: CartItem[];
};

export type MarketingStuff = {
  entryPage?: string;
  exitPage?: string;
  referrer?: string;
  isReturning?: boolean;
  discountsUsed?: {
    discountCode?: string;
    discountAmount?: number;
    isPercentage?: boolean;
  }[];
};

export type AnalyticsType = {
  userId: string;
  ipAddress: string;
  userAgent: UserAgent;
  visitStatus: VisitStatus;
  pageViews: PageView[];
  location: Location;
  productsViewed: ProductViewed[];
  shoppingCart: ShoppingCart;
  marketingStuff?: MarketingStuff;
  createdAt: Date;
  updatedAt: Date;
};
