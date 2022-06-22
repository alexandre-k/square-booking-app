import {
  CatalogObject,
  CatalogObjectType,
  Service,
  ServiceCategory,
  PricingType,
} from "types/Catalog";

export const getItemVariationData = (obj: CatalogObject) => {
  const variations = obj?.itemData?.variations;
  if (variations !== undefined && variations.length > 0) {
    return variations[0].itemVariationData;
  } else {
    return null;
  }
};

export const getItemVariation = (obj: CatalogObject) => {
  const variations = obj?.itemData?.variations;
  if (variations !== undefined && variations.length > 0) {
    return variations[0];
  } else {
    return null;
  }
};

export const hasItemVariation = (obj: CatalogObject) => {
  return getItemVariation(obj) === null ? false : true;
};

export const isItemAvailableForBooking = (obj: CatalogObject) => {
    return getItemVariationData(obj)!.availableForBooking;
};

export const hasItemVariationData = (obj: CatalogObject) => {
  return getItemVariationData(obj) === null ? false : true;
};

// export const hasServiceCategory = (obj: CatalogObject) =>
//   obj?.itemData?.ordinal === 0
//     ? ServiceCategory.MAIN
//     : ServiceCategory.OPTIONAL;

export const hasFixedPrice = (obj: CatalogObject) =>
  getItemVariationData(obj)!.pricingType === PricingType.VARIABLE_PRICING
    ? false
    : true;

export const isItem = (obj: CatalogObject) =>
  obj.type === CatalogObjectType.ITEM;

export const formatCatalogObjects = (catalogObjects: Array<CatalogObject>) => {
  return (
    catalogObjects
      .filter(isItem)
      .filter(hasItemVariationData)
      .filter(hasItemVariation)
      // .filter(hasServiceCategory)
      .filter(isItemAvailableForBooking)
      .filter(hasFixedPrice)
      .map((obj: CatalogObject) => {
        const category =
          obj!.itemData!.variations[0]!.itemVariationData.ordinal === 0
            ? ServiceCategory.MAIN
            : ServiceCategory.OPTIONAL;
        const itemVariationData =
          obj!.itemData!.variations[0]!.itemVariationData;
        const itemVariation = obj!.itemData!.variations[0];
        const duration = itemVariationData.serviceDuration;
        const id = itemVariation.id;
        const price = itemVariationData.priceMoney?.amount;
        const currency = itemVariationData.priceMoney?.currency;
        return {
          id,
          name: obj!.itemData!.name,
          price,
          currency,
          duration,
          category,
        } as Service;
      })
  );
};
