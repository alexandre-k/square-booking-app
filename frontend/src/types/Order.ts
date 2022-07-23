export enum OrderState {
    OPEN = "OPEN",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    DRAFT = "DRAFT"
};

export type BaseMoney = {
    currency: string;
    amount: number;
}

export type LineItem = {
    uid: string;
    basePriceMoney: BaseMoney;
    grossSalesMoney: BaseMoney;
    itemType: "ITEM";
    name: string;
    quantity: string;
    totalMoney: BaseMoney;
    totalTaxMoney: BaseMoney;
    variationTotalPriceMoney: BaseMoney;

}

export type Tender = {
    amountMoney: BaseMoney;
    createdAt: string;
    id: string;
    locationId: string;
    paymentId: string;
    transactionId: string;
    type: string;
}

export type Order = {
    lineItems: Array<LineItem>;
    id: string;
    locationId: string;
    source: {
        name: string;
    },
    state: OrderState;
    tenders: Array<Tender>;
    totalMoney: BaseMoney;
    totalServiceChargeMoney: BaseMoney;
    totalTaxMoney: BaseMoney;
    totalTipMoney: BaseMoney;
    updatedAt: string;
    version: number;
}
