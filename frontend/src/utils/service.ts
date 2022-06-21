import { CatalogObject, CatalogObjectType, Service } from "types/Catalog";

export const formatCatalogObjects = (catalogObjects: Array<CatalogObject>) => {
  return catalogObjects
    .filter((obj) => obj.type === CatalogObjectType.ITEM)
    .map((obj: CatalogObject) => {
      const variations = obj?.itemData?.variations;
      const hasVariations =
        variations !== undefined && obj.itemData.variations.length > 0;
      let duration = 3600000;
      let price = -1;
      let currency = "USD";
      let id = "";
      if (hasVariations && variations[0].itemVariationData) {
        duration = variations[0].itemVariationData.serviceDuration;
        id = variations[0].id;
        if (
          variations[0].itemVariationData.pricingType === "VARIABLE_PRICING"
        ) {
          price = -1;
        } else {
          price = variations[0].itemVariationData?.priceMoney?.amount;
          currency = variations[0].itemVariationData?.priceMoney?.currency;
        }
      }
      return {
        id,
        name: obj?.itemData?.name,
        price,
        currency,
        duration,
      } as Service;
    });
};
