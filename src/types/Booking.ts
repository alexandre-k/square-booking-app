export type AppointmentSegment = {
  duration_minutes: number;
  team_member_id: string;
  service_variation_id: string;
  service_variation_version: number;
  any_team_member: boolean;
  intermission_minutes: number;
};

export type Availability = {
  start_at: string;
  location_id: string;
  appointment_segments: Array<AppointmentSegment>;
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
  created_at: string;
  updated_at: string;
  location_id: string;
  customer_id: string;
  start_at: string;
  all_day: boolean;
  appointment_segments: Array<AppointmentSegment>;
  transition_time_minutes: number;
  customer_note: string;
  creator_details: {
    creator_type: CreatorType;
    team_member_id: string;
  };
  source: string;
  location_type: string;
};

export type TeamMemberBookingProfile = {
    team_member_id: string;
    display_name: string;
    is_bookable: boolean;
}
