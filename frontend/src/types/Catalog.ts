export enum CatalogObjectType {
  ITEM = "ITEM",
  IMAGE = "IMAGE",
  CATEGORY = "CATEGORY",
  ITEM_VARIATION = "ITEM_VARIATION",
  TAX = "TAX",
  DISCOUNT = "DISCOUNT",
  MODIFIER_LIST = "MODIFIER_LIST",
  MODIFIER = "MODIFIER",
}

export type Price = {
  amount: number;
  currency: string;
};

export type CatalogObjectItemVariationData = {
  itemId: string;
  name: string;
  priceMoney: Price;
  pricingType: string;
  serviceDuration: number;
  priceDescription: string;
  availableForBooking: boolean;
  sellable: boolean;
  stockable: boolean;
  transitionTime: number;
  team_memberIds: Array<string>;
};

export type CatalogObjectItemVariation = {
  type: CatalogObjectType;
  id: string;
  updatedAt: string;
  createdAt: string;
  version: number;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  itemVariationData: CatalogObjectItemVariationData;
};

export type CatalogObjectItem = {
  name: string;
  description: string;
  ordinal: number;
  variations: Array<CatalogObjectItemVariation>;
  productType: string;
};

export type CatalogObject = {
  type: CatalogObjectType;
  id: string;
  itemData: CatalogObjectItem;
  updatedAt: string;
  createdAt: string;
  version: number;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  subscriptionPlanData?: object;
  discountData?: object;
};
