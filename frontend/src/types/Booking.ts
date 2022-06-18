export type AppointmentSegment = {
  durationMinutes: number;
  teamMemberId: string;
  serviceVariationId: string;
  serviceVariationVersion: number;
  anyTeamMember: boolean;
  intermissionMinutes: number;
};

export type Availability = {
  startAt: string;
  locationId: string;
  appointmentSegments: Array<AppointmentSegment>;
};

export enum BookingStatus {
  PENDING = "PENDING",
  CANCELLED_BY_CUSTOMER = "CANCELLED_BY_CUSTOMER",
  CANCELLED_BY_SELLER = "CANCELLED_BY_SELLER",
  DECLINED = "DECLINED",
  ACCEPTED = "ACCEPTED",
  NO_SHOW = "NO_SHOW",
}

export enum CreatorType {
  TEAM_MEMBER = "TEAM_MEMBER",
  CUSTOMER = "CUSTOMER",
}

export enum Source {
  FIRST_PARTY_MERCHANT = "FIRST_PARTY_MERCHANT",
  FIRST_PARTY_BUYER = "FIRST_PARTY_BUYER",
  THIRD_PARTY_BUYER = "THIRD_PARTY_BUYER",
  API = "API",
}

export type Booking = {
  id: string;
  version: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  locationId: string;
  customerId: string;
  startAt: string;
  allDay: boolean;
  appointmentSegments: Array<AppointmentSegment>;
  transitionTimeMinutes: number;
  customerNote: string;
  creatorDetails: {
    creatorType: CreatorType;
    teamMemberId: string;
  };
  source: string;
  locationType: string;
};

export type TeamMemberBookingProfile = {
    teamMemberId: string;
    displayName: string;
    isBookable: boolean;
}
