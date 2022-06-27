import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";
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

interface BookingMutation {
    booking: Booking;
    selectedMemberId: string;
}

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
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
  } = useAuth0<{ name: string }>();

  // const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, setSelectedStartAt] = useState<string>("");

  const { bookingId } = useParams();
  const isBookingQueryEnabled = !!user && !!bookingId;
  const getBookingId = () => (!!bookingId ? bookingId : "");

  const queryClient = useQueryClient();

  const { isLoading, isSuccess, isError, data, error } = useQuery<
    GetBookingQuery,
    AxiosError
  >("customer/booking", () => getBooking(getBookingId()), {
    enabled: isBookingQueryEnabled,
  });


  const mutationFn = ({ booking, selectedMemberId }: BookingMutation): Promise<Booking> =>
    updateBooking(booking, selectedMemberId);

  const updateMember = useMutation(mutationFn, {
    mutationKey: "update/booking",
    onSuccess: () => {
      console.log("on success");
      return queryClient.invalidateQueries("customer/booking");
    },
    onMutate: () => {
      console.log("on mutate");
      setOpenEditDialog(false);
    },

    /* onMutate: (updatedBooking: GetBookingQuery) => {
     *   console.log("UpdatedBooking", updatedBooking);
     *   setSelectedMemberId(updatedBooking.teamMember.id);
     *   setOpenEditDialog(false);
     * }, */
    onError: (err, variables, context) => {
      console.log("TODO: handle error");
    },
  });

  // useEffect(() => {}, [isLoading, booking, isSuccess, user]);

  if (!isAuthenticated && !isAuthLoading) {
    return <InviteLogin />;
  }

  if (isLoading || isAuthLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <NoBookingFound
        title="Check your internet connection..."
        text={error.message}
      />
    );
  }
  if (isSuccess) {
    const { booking, teamMember, objects, relatedObjects, paymentLink } = data;
    //setBooking(booking);
    const selectedMemberId = teamMember.id;

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
              goNext={(selectedMemberId: string) =>
                updateMember.mutate({ booking, selectedMemberId })
              }
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

          {booking && objects && relatedObjects && teamMember && (
            <ServicesOverview
              disabled={isCancelled(booking.status)}
              appointmentSegments={booking.appointmentSegments}
              catalogObjectItemVariations={objects}
              catalogObjects={relatedObjects}
              member={teamMember}
              showEditDialog={showEditDialog}
            />
          )}
          {paymentLink && <Checkout paymentLink={paymentLink} />}
        </div>
      </>
    );
  }
  return <NoBookingFound title="No booking yet!" />;
};

export default Overview;
