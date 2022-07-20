import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import EditDialog from "components/Overview/EditDialog";
import Services from "components/Booking/Services";
import TeamMembers from "components/Booking/TeamMembers";
import DateTime from "components/Overview/DateTime";
import ServicesOverview from "components/Overview/Services";
import Checkout from "components/Overview/Checkout";
import DateTimePicker from "components/Booking/DateTimePicker";
import ExportToCalendar from "components/Overview/ExportToCalendar";
import { cancelBooking, updateAppointmentSegments } from "api/customer";
import { Booking, ShortAppointmentSegment } from "types/Booking";
import { Location } from "types/Location";
import { TeamMember } from "types/Team";
import { PaymentLink } from "types/Checkout";
import {
  CatalogObject,
  CatalogObjectItemVariation,
  Service,
} from "types/Catalog";
import { getTeamMemberId } from "utils/staff";
import { formatCatalogObjects, toAppointmentSegments } from "utils/service";
import { isCancelled, editDialogTitle, shortenSegment } from "utils/overview";
import { useMagicLogin } from "context/MagicLoginProvider";

interface SummaryProps {
  booking: Booking;
  teamMember: TeamMember;
  relatedObjects: Array<CatalogObject>;
  objects: Array<CatalogObjectItemVariation>;
  paymentLink: PaymentLink;
  location: Location;
}

interface BookingMutation {
  booking: Booking;
  segments: Array<ShortAppointmentSegment>;
}

interface CancelMutation {
  bookingId: string;
  jwt: string;
}

const Summary = ({
  booking,
  teamMember,
  relatedObjects,
  objects,
  paymentLink,
  location,
}: SummaryProps) => {
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editDialogComponent, setEditDialogComponent] =
    useState<string>("date");
  const [selectedMemberIds, setSelectedMemberIds] = useState<Array<string>>(
    teamMember ? [teamMember.id] : []
  );
  const [selectedUTCStartAt, setSelectedUTCStartAt] = useState<string>(
    booking.startAt
  );
  const [selectedServices, setSelectedServices] = useState<Array<Service>>(
    relatedObjects ? formatCatalogObjects(relatedObjects) : []
  );
  const [appointmentSegments, setAppointmentSegments] = useState<
    Array<ShortAppointmentSegment>
  >(booking ? booking.appointmentSegments.map(shortenSegment) : []);
  const { jwt } = useMagicLogin();

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    ({ booking, segments }: BookingMutation): Promise<Booking> =>
      updateAppointmentSegments(booking, segments, jwt),
    {
      mutationKey: "update/booking",
      onSuccess: () => queryClient.invalidateQueries("customer/booking"),
      onMutate: () => setOpenEditDialog(false),
      onError: (err, variables, context) => console.log("TODO: handle error"),
    }
  );

  const cancelMutation = useMutation(
    ({ bookingId, jwt }: CancelMutation): Promise<Booking> =>
      cancelBooking(bookingId, jwt),
    {
      mutationKey: "cancel/booking",
      onSuccess: () => {
        queryClient.invalidateQueries("customer/booking");
        navigate("/overview");
      },
      onMutate: () => setOpenEditDialog(false),
      onError: (err, variables, context) => console.log("TODO: handle error"),
    }
  );

  const isLoading = updateMutation.isLoading || cancelMutation.isLoading;

  const showEditDialog = (component: string) => {
    setEditDialogComponent(component);
    setOpenEditDialog(true);
  };
  const editDialogChild = (component: string) => {
    switch (component) {
      case "date":
        console.log(
          "TODO: introduce time limit - e.g.: reschedule until 1 day before "
        );
        return (
          <DateTimePicker
            selectedServices={selectedServices}
            memberIds={selectedMemberIds}
            selectedUTCStartAt={selectedUTCStartAt}
            timezone={location.timezone}
            setSelectedUTCStartAt={setSelectedUTCStartAt}
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
            selectedMemberIds={selectedMemberIds}
            onDone={(teamMemberIds: Array<string>) => {
              setSelectedMemberIds(teamMemberIds);
              updateMutation.mutate({
                booking,
                segments: toAppointmentSegments(
                  selectedServices,
                  teamMemberIds
                ),
              });
            }}
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
          save={() => {
            booking.startAt = selectedUTCStartAt;
            updateMutation.mutate({
              booking,
              segments: toAppointmentSegments(
                selectedServices,
                selectedMemberIds
              ),
            });
          }}
        >
          {editDialogChild(editDialogComponent)}
        </EditDialog>
      )}
      {booking && (
        <div className="summaryGrid">
          <DateTime
            disabled={isCancelled(booking.status)}
            booking={booking}
            isLoading={isLoading}
            appointmentSegments={booking.appointmentSegments}
            cancelBooking={async () => {
              cancelMutation.mutate({ bookingId: booking.id, jwt });
            }}
            showEditDialog={showEditDialog}
            locationTimezone={location.timezone}
          />

          <ExportToCalendar
            isLoading={isLoading}
            booking={booking}
            services={relatedObjects}
          />

          <ServicesOverview
            isLoading={isLoading}
            disabled={isCancelled(booking.status)}
            appointmentSegments={booking.appointmentSegments}
            catalogObjectItemVariations={objects}
            catalogObjects={relatedObjects}
            member={teamMember}
            showEditDialog={showEditDialog}
          />
          <Checkout paymentLink={paymentLink} isCheckedOut={false} />
        </div>
      )}
    </>
  );
};

export default Summary;
