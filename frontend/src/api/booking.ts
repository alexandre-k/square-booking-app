import { sendRequest } from "utils/request";
import { User } from "types/Customer";

export const bookAppointment = async (customer: User, selectedStartAt: string, selectedServices: Array<string>, selectedMemberId: string) => {
    return await sendRequest("/customer/booking", "POST", {
        booking: {
            ...customer,
            customerNote: "",
            locationId: process.env.REACT_APP_LOCATION_ID,
            // locationType: LocationType.BUSINESS_LOCATION,
            // sellerNote: "",
            startAt: selectedStartAt,
            appointmentSegments: selectedServices.map(serviceId => {
                return {
                    durationMinutes: 30,
                    serviceVariationId: serviceId,
                    teamMemberId: selectedMemberId,
                    serviceVariationVersion: 1,
                };
            }),
        },
    });
};

