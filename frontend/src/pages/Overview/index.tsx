import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import EditDialog from "components/Overview/EditDialog";
import Loading from "components/Loading";
import { Booking } from "types/Booking";
import { TeamMember } from "types/Team";
import { PaymentLink } from "types/Checkout";
import { CatalogObject, CatalogObjectItemVariation } from "types/Catalog";
import "./index.css";
import Services from "components/Booking/Services";
import TeamMembers from "components/Booking/TeamMembers";
import DateTime from "components/Overview/DateTime";
import ServicesOverview from "components/Overview/Services";
import NoBookingFound from "components/Overview/NoBookingFound";
import Checkout from "components/Overview/Checkout";
import InviteLogin from "components/Auth/InviteLogin";
import DateTimePicker from "components/Booking/DateTimePicker";
import { isCancelled, editDialogTitle } from "utils/overview";
import { getBooking, cancelBooking, updateBooking } from "api/customer";
import ExportToCalendar from "components/Overview/ExportToCalendar";

interface GetBookingQuery {
  booking: Booking;
  teamMember: TeamMember;
  relatedObjects: Array<CatalogObject>;
  objects: Array<CatalogObjectItemVariation>;
  paymentLink: PaymentLink;
}

const Overview = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editDialogComponent, setEditDialogComponent] =
    useState<string>("date");
  const [member, setMember] = useState<TeamMember | null>(null);
  const [catalogObjects, setCatalogObjects] = useState<Array<CatalogObject>>(
    []
  );
  const [catalogObjectItemVariations, setCatalogObjectItemVariations] =
    useState<Array<CatalogObjectItemVariation>>([]);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
  } = useAuth0<{ name: string }>();

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, setSelectedStartAt] = useState<string>("");

  const { isLoading, isError, data, error } = useQuery<
    GetBookingQuery,
    AxiosError
  >("customer/booking", () => getBooking(user ? user.name : ""), {
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setBooking(data.booking);
      setMember(data.teamMember);
      setSelectedMemberId(data.teamMember.id);
      setSelectedServices(
        data.objects.map((object: CatalogObjectItemVariation) => object.id)
      );
      setCatalogObjects(data.relatedObjects);
      setCatalogObjectItemVariations(data.objects);
      setPaymentLink(data.paymentLink);
    }
  }, [data, user]);

  if (!isAuthenticated && !isAuthLoading) {
    return <InviteLogin />;
  }

  if (isLoading || isAuthLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <NoBookingFound
        title="Got an error while fetching bookings:"
        text={error.message}
      />
    );
  }

  if (booking === null) {
    return <NoBookingFound title="No booking yet!" />;
  }

  const save = () => {
    updateBooking(booking, selectedMemberId ? selectedMemberId : "");
    setOpenEditDialog(false);
  };

  const showEditDialog = (component: string) => {
    setEditDialogComponent(component);
    setOpenEditDialog(true);
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
            disabled={isCancelled(booking.status)}
            booking={booking}
            loading={loading}
            appointmentSegments={booking.appointmentSegments}
            cancelBooking={cancelBooking}
            showEditDialog={showEditDialog}
          />
        )}

        {booking && <ExportToCalendar />}

        {booking && catalogObjects && catalogObjectItemVariations && member && (
          <ServicesOverview
            disabled={isCancelled(booking.status)}
            appointmentSegments={booking.appointmentSegments}
            catalogObjectItemVariations={catalogObjectItemVariations}
            catalogObjects={catalogObjects}
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
