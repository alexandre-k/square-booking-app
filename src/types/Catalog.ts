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
  item_id: string;
  name: string;
  price_money: Price;
  pricing_type: string;
  service_duration: number;
  price_description: string;
  available_for_booking: boolean;
  sellable: boolean;
  stockable: boolean;
  transition_time: number;
  team_member_ids: Array<string>;
};

export type CatalogObjectItemVariation = {
  type: CatalogObjectType;
  id: string;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  item_variation_data: CatalogObjectItemVariationData;
};

export type CatalogObjectItem = {
  name: string;
  description: string;
  ordinal: number;
  variations: Array<CatalogObjectItemVariation>;
  product_type: string;
};

export type CatalogObject = {
  type: CatalogObjectType;
  id: string;
  item_data: CatalogObjectItem;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  subscription_plan_data?: object;
  discount_data?: object;
};
