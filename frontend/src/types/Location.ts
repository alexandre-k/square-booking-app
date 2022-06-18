export type Address = {
  addressLine1: string;
  locality: string;
  administrativeDistrictLevel1: string;
  postalCode: string;
  country: string;
};

export enum LocationType {
  BUSINESS_LOCATION = "BUSINESS_LOCATION",
  CUSTOMER_LOCATION = "CUSTOMER_LOCATION",
  PHONE = "PHONE",
}

export enum Capability {
  CREDIT_CARD_PROCESSING = "CREDIT_CARD_PROCESSING",
  AUTOMATIC_TRANSFERS = "AUTOMATIC_TRANSFERS",
}

export enum DayOfWeek {
  MONDAY = "MON",
  TUESDAY = "TUE",
  WEDSNEDAY = "WED",
  THURSDAY = "THU",
  FRIDAY = "FRI",
}

export type Period = {
  dayOfWeek: DayOfWeek;
  startLocalTime: string;
  endLocalTime: string;
};

export type BusinessHours = {
  periods: Array<Period>;
};

export type Location = {
  id: string;
  name: string;
  address: Address;
  timezone: string;
  capabilities: Array<Capability>;
  status: string;
  createdAt: string;
  merchantId: string;
  country: string;
  languageCode: string;
  currency: string;
  phoneNumber: string;
  businessName: string;
  type: string;
  businessHours: BusinessHours;
  businessEmail: string;
  mcc: string;
};
