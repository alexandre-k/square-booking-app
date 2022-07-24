import {
  CatalogObject,
  CatalogObjectType,
  Service,
  ServiceCategory,
  PricingType,
} from "types/Catalog";
import { BaseMoney } from "types/Order";
import { convertMsToMins } from "./dateTime";
import { getTeamMemberId } from "./staff";

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
  return !!getItemVariationData(obj)?.availableForBooking;
};

export const hasItemVariationData = (obj: CatalogObject) => {
  return !!getItemVariationData(obj);
};

// export const hasServiceCategory = (obj: CatalogObject) =>
//   obj?.itemData?.ordinal === 0
//     ? ServiceCategory.MAIN
//     : ServiceCategory.OPTIONAL;

export const hasFixedPrice = (obj: CatalogObject) => {
  const pricingType = getItemVariationData(obj)?.pricingType;
  return !!pricingType && pricingType !== PricingType.VARIABLE_PRICING;
};

export const isItem = (obj: CatalogObject) =>
  obj.type === CatalogObjectType.ITEM;

export const formatCatalogObjects = (catalogObjects: Array<CatalogObject>) =>
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
      const itemVariationData = obj!.itemData!.variations[0]!.itemVariationData;
      const itemVariation = obj!.itemData!.variations[0];
      const duration = itemVariationData.serviceDuration;
      const id = itemVariation.id;
      const version = itemVariation.version;
      const amount = itemVariationData.priceMoney?.amount;
      const currency = itemVariationData.priceMoney?.currency;
      const teamMemberIds = itemVariationData.teamMemberIds;
      return {
        id,
        version,
        name: obj!.itemData!.name,
        money: {
          amount: amount || 0,
          currency: currency || "USD",
        },
        duration,
        category,
        teamMemberIds,
      } as Service;
    });

export const hasServiceIncluded = (
  services: Array<Service>,
  service: Service
) => {
  return services.filter((s) => s.id === service.id).length !== 0;
};

export const toAppointmentSegments = (
  services: Array<Service>,
  memberIds: Array<string>
) => {
  return services.map((service) => ({
    // anyTeamMember: selectedMemberIds.length > 1,
    durationMinutes: convertMsToMins(service.duration),
    serviceVariationId: service.id,
    teamMemberId: getTeamMemberId(memberIds),
    serviceVariationVersion: service.version,
  }));
};

export const getMoneyAsCurrency = (money: BaseMoney) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currency,
  }).format(money.amount);
};
