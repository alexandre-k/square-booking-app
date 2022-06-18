export type Customer = {
    createdAt: string;
    creationSource: string;
    emailAddress: string;
    givenName: string;
    id: string;
    preferences: {
        emailUnsubscribed: boolean;
    },
    segmentIds: Array<string>;
    updatedAt: string;
    version: number;
}
