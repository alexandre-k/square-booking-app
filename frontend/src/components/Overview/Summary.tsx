import React, { useState } from "react";
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
import {
  Booking,
  ShortAppointmentSegment,
} from "types/Booking";
import { Location } from "types/Location";
import { TeamMember } from "types/Team";
import { PaymentLink } from "types/Checkout";
import {
  CatalogObject,
  CatalogObjectItemVariation,
  Service,
} from "types/Catalog";
import { formatCatalogObjects } from "utils/service";
import { convertMsToMins } from "utils/dateTime";
import { isCancelled, editDialogTitle, shortenSegment } from "utils/overview";

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
  appointmentSegments: Array<ShortAppointmentSegment>;
}

type ServiceID = string;

const Summary = ({
  booking,
  teamMember,
  relatedObjects,
  objects,
  paymentLink,
  location,
}: SummaryProps) => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editDialogComponent, setEditDialogComponent] =
    useState<string>("date");
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    teamMember.id
  );
  const [selectedStartAt, setSelectedStartAt] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<Array<ServiceID>>(
    formatCatalogObjects(relatedObjects).map((service) => service.id)
  );
  const [appointmentSegments, setAppointmentSegments] = useState<
    Array<ShortAppointmentSegment>
  >(booking.appointmentSegments.map(shortenSegment));

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ booking, appointmentSegments }: BookingMutation): Promise<Booking> =>
      updateAppointmentSegments(booking, appointmentSegments),
    {
      mutationKey: "update/booking",
      onSuccess: () => queryClient.invalidateQueries("customer/booking"),
      onMutate: () => setOpenEditDialog(false),
      onError: (err, variables, context) => console.log("TODO: handle error"),
    }
  );

  const showEditDialog = (component: string) => {
    setEditDialogComponent(component);
    setOpenEditDialog(true);
  };
  const editDialogChild = (component: string) => {
    switch (component) {
      case "date":
            console.log('TODO: introduce time limit - e.g.: reschedule until 1 day before ')
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
            onDone={(services: Array<Service>) => {
              setSelectedServices(services.map((service) => service.id));
              const newAppointmentSegments: Array<ShortAppointmentSegment> =
                services.map((service: Service) => {
                  return {
                    durationMinutes: convertMsToMins(service.duration),
                    teamMemberId: selectedMemberId,
                    serviceVariationId: service.id,
                    serviceVariationVersion: service.version,
                  };
                });
              setAppointmentSegments(newAppointmentSegments);
            }}
          />
        );
      case "member":
        return (
          <TeamMembers
            showOwner={false}
            selectedMemberId={selectedMemberId}
            onDone={(memberId: string) =>
              mutate({
                booking,
                appointmentSegments: appointmentSegments.map(
                  (segment: ShortAppointmentSegment) => {
                    return { ...segment, teamMemberId: memberId };
                  }
                ),
              })
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
          save={() => mutate({ booking, appointmentSegments })}
        >
          {editDialogChild(editDialogComponent)}
        </EditDialog>
      )}
      <div className="summaryGrid">
        <DateTime
          disabled={isCancelled(booking.status)}
          booking={booking}
          isLoading={isLoading}
          appointmentSegments={booking.appointmentSegments}
          cancelBooking={cancelBooking}
          showEditDialog={showEditDialog}
          localTimezone={location.timezone}
        />

        <ExportToCalendar
          isLoading={isLoading}
          appointmentSegments={booking.appointmentSegments}
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
        <Checkout paymentLink={paymentLink} />
      </div>
    </>
  );
};

export default Summary;
