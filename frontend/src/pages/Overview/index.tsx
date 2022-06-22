import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RescheduleDialog from "components/Overview/RescheduleDialog";
import Loading from "components/Loading";
import { Booking } from "types/Booking";
import { TeamMember } from "types/Team";
import { DayOfWeek } from "types/Location";
import { PaymentLink } from "types/Checkout";
import { CatalogObject } from "types/Catalog";
import "./index.css";
import DateTime from "components/Overview/DateTime";
import Services from "components/Overview/Services";
import Checkout from "components/Overview/Checkout";
import InviteLogin from "components/Auth/InviteLogin";
import { sendRequest } from "utils/request";

/* interface OverviewProps {
 *   booking: Booking;
 * } */

const Overview = () => {
  //{ booking }: OverviewProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openRescheduleDialog, setOpenRescheduleDialog] =
    useState<boolean>(false);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [catalogObject, setCatalogObject] = useState<CatalogObject | null>(
    null
  );
  // const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const { isAuthenticated, user } = useAuth0<{ name: string }>();

  const getBooking = async (email: string) => {
    const data = await sendRequest("/customer/booking?email=" + email, "GET");
    if (data === -1) {
      console.log("TODO: if error notify the user", data);
      return null;
    }
    return data;
  };
  const cancelBooking = async (bookingId: string) => {
    const data = await sendRequest("/booking/" + bookingId, "DELETE");
    if (data === -1) {
      console.log("TODO: if error notify the user", data);
      return null;
    }
    return data;
  };

  useEffect(() => {
    // @ts-ignore
    if (booking === null && user) {
      getBooking(user.name).then(
        ({ booking, teamMember, object, paymentLink }) => {
          setBooking(booking);
          setMember(teamMember);
          setCatalogObject(object);
          setPaymentLink(paymentLink);
          // @ts-ignore
          /* if (booking.appointmentSegments.length > 0) {
           *   const appointment = booking.appointmentSegments[0];
           *   // retrieveTeamMemberProfile(appointment.teamMemberId);
           *   retrieveCatalogObject(appointment.serviceVariationId);
           * } */
        }
      );
    }
  }, [booking, user]);

  if (booking === null && isAuthenticated) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <InviteLogin />;
  }

  const editService = (catalogObject: CatalogObject) => {
    console.log("TODO: Edit > ", catalogObject);
  };
  const editStaff = (member: TeamMember) => {
    console.log("TODO: Edit > ", member);
  };

  return (
    <>
      <RescheduleDialog
        open={openRescheduleDialog}
        setOpen={setOpenRescheduleDialog}
      />
      <div className="summaryGrid">
        {booking && (
          <DateTime
            booking={booking}
            loading={loading}
            appointmentSegments={booking.appointmentSegments}
            setLoading={setLoading}
            cancelBooking={cancelBooking}
            setOpenRescheduleDialog={setOpenRescheduleDialog}
          />
        )}

        {booking && catalogObject && member && (
          <Services
            appointmentSegments={booking.appointmentSegments}
            catalogObject={catalogObject}
            member={member}
            editService={editService}
            editStaff={editStaff}
          />
        )}
        {paymentLink && <Checkout paymentLink={paymentLink} />}
      </div>
    </>
  );
};

export default Overview;
