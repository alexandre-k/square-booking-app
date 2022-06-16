export type Address = {
    address_line_1: string,
    locality: string,
    administrative_district_level_1: string,
    postal_code: string,
    country: string
};

export enum LocationType {
    BUSINESS_LOCATION = "BUSINESS_LOCATION",
    CUSTOMER_LOCATION = "CUSTOMER_LOCATION",
    PHONE = "PHONE"
}

export enum Capability {
    CREDIT_CARD = "CREDIT_CARD_PROCESSING",
    TRANSFER = "AUTOMATIC_TRANSFERS"
};

export enum DayOfWeek {
    MONDAY = "MON",
    TUESDAY = "TUE",
    WEDSNEDAY = "WED",
    THURSDAY = "THU",
    FRIDAY = "FRI"
};

export type Period = {
    day_of_week: DayOfWeek;
    start_local_time: string;
    end_local_time: string;
};

export type BusinessHours = {
    periods: Array<Period>;
}

export type Location = {
    id: string;
    name: string;
    address: Address;
    timezone: string;
    capabilities: string[];
    status: string;
    created_at: string;
    merchant_id: string;
    country: string;
    language_code: string;
    currency: string;
    phone_number: string;
    business_name: string;
    type: string;
    business_hours: BusinessHours;
    business_email: string;
    mcc: string;
}
