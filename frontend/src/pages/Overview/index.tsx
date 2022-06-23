import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import EditDialog from "components/Overview/EditDialog";
import Loading from "components/Loading";
import { Booking } from "types/Booking";
import { TeamMember } from "types/Team";
import { DayOfWeek } from "types/Location";
import { PaymentLink } from "types/Checkout";
import { CatalogObject } from "types/Catalog";
import "./index.css";
import Services from "components/Booking/Services";
import TeamMembers from "components/Booking/TeamMembers";
import DateTime from "components/Overview/DateTime";
import ServicesOverview from "components/Overview/Services";
import Checkout from "components/Overview/Checkout";
import InviteLogin from "components/Auth/InviteLogin";
import DateTimePicker from "components/Booking/DateTimePicker";
import { sendRequest } from "utils/request";

/* interface OverviewProps {
 *   booking: Booking;
 * } */

const Overview = () => {
  //{ booking }: OverviewProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editDialogComponent, setEditDialogComponent] =
    useState<string>("date");
  const [member, setMember] = useState<TeamMember | null>(null);
  const [catalogObject, setCatalogObject] = useState<CatalogObject | null>(
    null
  );
  // const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const { isAuthenticated, user } = useAuth0<{ name: string }>();

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, setSelectedStartAt] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("Test title");

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
  const updateBooking = async (bookingId: string) => {
    if (booking === null) return;
    const data = await sendRequest("/booking/" + bookingId, "PUT", {
      booking: {
        customerId: booking.customerId,
        locationId: booking.locationId,
        locationType: booking.locationType,
        appointmentSegments: booking.appointmentSegments,
        /* appointmentSegments: [
         *   {
         *     teamMemberId: selectedMemberId,
         *     durationMinutes: durationMinutes,
         *     serviceVariationId: serviceVariationId,
         *     serviceVariationVersion: serviceVariationVersion,
         *   },
         * ], */
        sellerNote: booking.sellerNote,
        startAt: booking.startAt,
        version: booking.version,
        customerNote: booking.customerNote,
      },
    });
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
          setSelectedMemberId(teamMember.id);
          setSelectedServices([object.id]);
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

  const save = () => {
    setOpenEditDialog(false);
  };

  const showEditDialog = (component: string) => {
    setEditDialogComponent(component);
    setOpenEditDialog(true);
  };

  const editDialogTitle = (component: string) => {
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

  const editDialogChild = (component: string) => {
    switch (component) {
      case "date":
        return (
          <DateTimePicker
            selectedServices={selectedServices}
            memberId={selectedMemberId}
            selectedStartAt={selectedStartAt}
            setSelectedStartAt={setSelectedStartAt}
          />
        );
      case "service":
        return (
          <Services
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
        );
      case "member":
        return (
          <TeamMembers
            showOwner={false}
            selectedMemberId={selectedMemberId}
            setSelectedMemberId={setSelectedMemberId}
            goNext={() => console.log("Implement go next")}
          />
        );
    }
  };

  return (
    <>
      {openEditDialog && (
        <EditDialog
          title={editDialogTitle(editDialogComponent)}
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          save={save}
        >
          {editDialogChild(editDialogComponent)}
        </EditDialog>
      )}
      <div className="summaryGrid">
        {booking && (
          <DateTime
            booking={booking}
            loading={loading}
            appointmentSegments={booking.appointmentSegments}
            setLoading={setLoading}
            cancelBooking={cancelBooking}
            showEditDialog={showEditDialog}
          />
        )}

        {booking && catalogObject && member && (
          <ServicesOverview
            appointmentSegments={booking.appointmentSegments}
            catalogObject={catalogObject}
            member={member}
            showEditDialog={showEditDialog}
          />
        )}
        {paymentLink && <Checkout paymentLink={paymentLink} />}
      </div>
    </>
  );
};

export default Overview;
