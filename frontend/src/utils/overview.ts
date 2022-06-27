import { AppointmentSegment, BookingStatus } from "types/Booking";

export const editDialogTitle = (component: string) => {
    switch (component) {
        case "date":
            return "Set date and time";
        case "service":
            return "Add or remove a service";
        case "member":
            return "Set team member";
        default:
            return "Title not set";
    }
};

export const isCancelled = (status: BookingStatus) =>
    status === BookingStatus.CANCELLED_BY_CUSTOMER ||
    status === BookingStatus.CANCELLED_BY_SELLER ||
    status === BookingStatus.DECLINED;

export const shortenSegment = (segment: AppointmentSegment) => {
    const { intermissionMinutes, anyTeamMember, ...rest } = segment;
    return rest;
}
