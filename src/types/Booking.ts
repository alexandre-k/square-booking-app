export type AppointmentSegment = {
    duration_minutes: number;
    team_member_id: string;
    service_variation_id: string;
    service_variation_version: number;
}

export type Availability = {
    start_at: string,
    location_id: string,
    appointment_segments: Array<AppointmentSegment>;
}


export type Booking = {
    id: string;
    version: number;
    created_at: string;
    updated_at: string;
    location_id: string;
    customer_id: string;
    customer_note: string;
    start_at: string;
    all_day: boolean;
    appointment_segments: Array<AppointmentSegment>;
    transition_time_minutes: number;
    create_details: {
        creator_type: string;
        team_member_id: string;
    }
    source: string;
    location_type: "BUSINESS_LOCATION";
}
