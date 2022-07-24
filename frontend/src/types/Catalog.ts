import { BaseMoney } from "types/Order";

export enum ServiceCategory {
  MAIN = "MAIN",
  OPTIONAL = "OPTIONAL",
}

export type Service = {
  id: string;
  version: number;
  name: string;
  money: BaseMoney;
  duration: number;
  category: ServiceCategory;
  teamMemberIds: Array<string>;
};

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

export enum PricingType {
  FIXED_PRICING = "FIXED_PRICING",
  VARIABLE_PRICING = "VARIABLE_PRICING",
}

export type CatalogObjectItemVariationData = {
  itemId: string;
  name: string;
  ordinal?: number;
  priceMoney?: Price;
  pricingType: PricingType;
  serviceDuration: number;
  priceDescription: string;
  availableForBooking: boolean;
  sellable: boolean;
  stockable: boolean;
  transitionTime: number;
  teamMemberIds: Array<string>;
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
  description?: string;
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
