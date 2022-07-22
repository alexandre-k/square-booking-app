import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { AxiosError } from "axios";
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
import { formatCatalogObjects, toAppointmentSegments } from "utils/service";
import { isCancelled, editDialogTitle } from "utils/overview";
import { useMagicLogin } from "context/MagicLoginProvider";

interface SummaryProps {
  booking: Booking;
  teamMember: TeamMember;
  relatedObjects: Array<CatalogObject>;
  objects: Array<CatalogObjectItemVariation>;
  paymentLink: PaymentLink;
  location: Location;
  selectedMemberIds: Array<string>;
  setSelectedMemberIds: (memberIds: Array<string>) => void;
  selectedUTCStartAt: string;
  setSelectedUTCStartAt: (startAt: string) => void;
  selectedServices: Array<Service>;
  setSelectedServices: (services: Array<Service>) => void;
  isFetching: boolean;
}

interface BookingMutation {
  booking: Booking;
  segments: Array<ShortAppointmentSegment>;
  services: Array<Service>;
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
  selectedMemberIds,
  setSelectedMemberIds,
  selectedUTCStartAt,
  setSelectedUTCStartAt,
  selectedServices,
  setSelectedServices,
  isFetching
}: SummaryProps) => {
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editDialogComponent, setEditDialogComponent] =
    useState<string>("date");

  const { jwt } = useMagicLogin();

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    ({ booking, segments, services }: BookingMutation): Promise<Booking> =>
      updateAppointmentSegments(booking, segments, services, jwt),
    {
      mutationKey: "update/booking",
      onSuccess: () => {
        queryClient.invalidateQueries(["customer/booking/" + booking.id]);
      },
      onMutate: () => setOpenEditDialog(false),
      onError: (err: AxiosError) => {
        const error = err?.response?.data;
        const status = err?.response?.status;
        console.log("Error > ", error, status);
      },
    }
  );

  const cancelMutation = useMutation(
    ({ bookingId, jwt }: CancelMutation): Promise<Booking> =>
      cancelBooking(bookingId, jwt),
    {
      mutationKey: "cancel/booking",
      onSuccess: () => {
        queryClient.invalidateQueries(["customer/booking/" + booking.id]);
        navigate("/overview");
      },
      onMutate: () => setOpenEditDialog(false),
      onError: (err, variables, context) => console.log("TODO: handle error"),
    }
  );

  const isLoading = updateMutation.isLoading || cancelMutation.isLoading || isFetching;

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
                services: selectedServices,
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
              services: selectedServices,
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
          <Checkout
            isLoading={isLoading}
            paymentLink={paymentLink}
            isCheckedOut={false}
          />
        </div>
      )}
    </>
  );
};

export default Summary;
