export type Customer = {
    created_at: string;
    creation_source: string;
    email_address: string;
    given_name: string;
    id: string;
    preferences: {
        email_unsubscribed: boolean;
    },
    segment_ids: Array<string>;
    updated_at: string;
    version: number;
}
