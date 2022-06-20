export type PaymentLink = {
    id: string;
    version: number;
    description: string;
    orderId: string;
    checkoutOptions: {
       redirectUrl: string
    };
    url: string;
    createdAt: string;
}
