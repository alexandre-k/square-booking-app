import { Service } from "types/Catalog";
import {
  getItemVariationData,
  getItemVariation,
  hasItemVariation,
  isItemAvailableForBooking,
  hasItemVariationData,
  hasFixedPrice,
  isItem,
  formatCatalogObjects,
} from "./service";

describe("Interacting with CatalogObject", () => {
  const testCatalogObject = {
    type: "ITEM",
    id: "ONGDL4DOPKN3CLDQIV67VUNN",
    updatedAt: "2022-06-05T23:07:38.871Z",
    createdAt: "2022-06-04T14:54:59.251Z",
    version: 1654470458871,
    isDeleted: false,
    presentAtAllLocations: true,
    itemData: {
      name: "Women's Haircut",
      ordinal: 0,
      variations: [
        {
          type: "ITEM_VARIATION",
          id: "5A4NN3ABCOEYIFA35ZCCJAG7",
          updatedAt: "2022-06-05T23:07:38.871Z",
          createdAt: "2022-06-04T14:54:59.251Z",
          version: 1654470458871,
          isDeleted: false,
          presentAtAllLocations: true,
          itemVariationData: {
            itemId: "ONGDL4DOPKN3CLDQIV67VUNN",
            name: "Regular",
            pricingType: "FIXED_PRICING",
            serviceDuration: 3600000,
            priceDescription: "Price Varies",
            availableForBooking: true,
            transitionTime: 0,
            sellable: true,
            stockable: true,
            teamMemberIds: [
              "TM_C5HCXPk2LajOY",
              "TMbwtPGv72uRGpvX",
              "TMmcMj37rxlKyw49",
              "TMieLNp58RJFzFLs",
            ],
          },
        },
      ],
      productType: "APPOINTMENTS_SERVICE",
    },
  };

  const testDiscountCatalogObject = {
    type: "SUBSCRIPTION_PLAN",
    id: "7CQGMBKJOWUCDFDOPUYVZTVN",
    updatedAt: "2022-06-05T08:12:03.429Z",
    createdAt: "2022-06-05T08:12:03.429Z",
    version: 1654416723429,
    isDeleted: false,
    presentAtAllLocations: true,
    subscriptionPlanData: {
      name: "Test plan",
      phases: [
        {
          uid: "CIUZTA3Q3LOACRZ5DKB5SL4A",
          cadence: "WEEKLY",
          periods: 9,
          recurringPriceMoney: {
            amount: 0,
            currency: "USD",
          },
          ordinal: 0,
        },
        {
          uid: "AB6CRCTU3BO77YIGE63D64VN",
          cadence: "MONTHLY",
          recurringPriceMoney: {
            amount: 0,
            currency: "USD",
          },
          ordinal: 1,
        },
      ],
    },
  };

  test("item variation data is returned from a CatalogObject", () => {
    expect(getItemVariationData(testCatalogObject)).toMatchObject(
      testCatalogObject.itemData.variations[0].itemVariationData
    );
    expect(getItemVariationData(testDiscountCatalogObject)).toBeNull();
  });

  test("item variation is being returned", () => {
    expect(getItemVariation(testCatalogObject)).toMatchObject(
      testCatalogObject.itemData.variations[0]
    );
    expect(getItemVariation(testDiscountCatalogObject)).toBeNull();
  });

  test("has item variation returns true for a matching object", () => {
    expect(hasItemVariation(testCatalogObject)).toBe(true);
    expect(hasItemVariation(testDiscountCatalogObject)).toBe(false);
  });

  test("an item available for booking is returned if the property exists", () => {
    expect(isItemAvailableForBooking(testCatalogObject)).toBe(true);
    expect(isItemAvailableForBooking(testDiscountCatalogObject)).toBe(false);
  });

  test("an item has variation data if the property exists", () => {
    expect(hasItemVariationData(testCatalogObject)).toBe(true);
    expect(hasItemVariationData(testDiscountCatalogObject)).toBe(false);
  });

  // test("an item has ordinal sorting available if the property exists", () => {
  //     expect(hasServiceCategory(testCatalogObject)).toBe(ServiceCategory.MAIN);
  //     expect(hasServiceCategory(testDiscountCatalogObject)).toBe(ServiceCategory.OPTIONAL);
  // });

  test("an item has a fixed price", () => {
    expect(hasFixedPrice(testCatalogObject)).toBe(true);
    expect(hasFixedPrice(testDiscountCatalogObject)).toBe(false);
  });

  test("an item is defined as is", () => {
    expect(isItem(testCatalogObject)).toBe(true);
    expect(isItem(testDiscountCatalogObject)).toBe(false);
  });

  test("a CatalogOBject is formated to a Service", () => {
    const result = formatCatalogObjects([testCatalogObject]);
    const expectedService: Service = {
      category: "OPTIONAL",
      currency: undefined,
      duration: 3600000,
      id: "5A4NN3ABCOEYIFA35ZCCJAG7",
      name: "Women's Haircut",
      price: undefined,
      teamMemberIds: [
        "TM_C5HCXPk2LajOY",
        "TMbwtPGv72uRGpvX",
        "TMmcMj37rxlKyw49",
        "TMieLNp58RJFzFLs",
      ],
      version: 1654470458871,
    };

    const emptyResult = formatCatalogObjects([testDiscountCatalogObject]);

    expect(result[0]).toMatchObject(expectedService);
    expect(emptyResult.length === 0).toBe(true);
  });
});
