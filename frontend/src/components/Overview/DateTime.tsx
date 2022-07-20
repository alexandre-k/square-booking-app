import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UpdateIcon from "@mui/icons-material/Update";
import Header from "components/Overview/Header";
import Status from "components/Overview/Status";
import { Booking, BookingStatus, Color } from "types/Booking";
import { AppointmentSegment } from "types/Booking";
import { localizedDate } from "utils/dateTime";

interface DateTimeProps {
  booking: Booking;
  appointmentSegments: Array<AppointmentSegment>;
  locationTimezone: string;
  isLoading: boolean;
  disabled: boolean;
  cancelBooking: () => Promise<void>;
  showEditDialog: (component: string) => void;
}

const DateTime = ({
  booking,
  appointmentSegments,
  isLoading,
  disabled,
  locationTimezone,
  cancelBooking,
  showEditDialog,
}: DateTimeProps) => {
  const cancel = async () => {
    await cancelBooking();
    console.log("TODO: Reload booking summary page");
  };

  const displayDateTime = (startAt: string, timezone: string) => {
    const date = localizedDate(startAt, timezone);

    const durations = appointmentSegments.reduce(
      (acc, appointment) => appointment.durationMinutes + acc,
      0
    );
    const endDate = date.add(durations, "minutes");
    return (
      <div className="dateTime">
        <div>{date.format("dddd DD MMMM")}</div>
        <div>
          {date.format("HH:mm ")} - {endDate.format("HH:mm")}
        </div>
      </div>
    );
  };

  const getStatus = (bookingStatus: BookingStatus) => {
    switch (bookingStatus) {
      case BookingStatus.ACCEPTED:
        return {
          label: "Accepted",
          color: "success" as Color,
          icon: <EventAvailableIcon />,
        };
      case BookingStatus.CANCELLED_BY_SELLER:
      case BookingStatus.CANCELLED_BY_CUSTOMER:
      case BookingStatus.DECLINED:
        return {
          label: "Canceled",
          color: "error" as Color,
          icon: <EventBusyIcon />,
        };
      default:
        return {
          label: "Pending",
          color: "info" as Color,
          icon: <ScheduleSendIcon />,
        };
    }
  };

  const bookingStatus = getStatus(booking.status);
  const isCancelBtnDisabled =
    booking.status !== BookingStatus.ACCEPTED &&
    booking.status !== BookingStatus.PENDING;
  if (isLoading) {
    return (
      <Card className="card">
        <Stack spacing={1}>
          <Skeleton variant="text" width={100} height={25} />
          <Skeleton variant="rectangular" width={310} height={50} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Skeleton variant="rectangular" width={100} height={25} />
            <Skeleton variant="rectangular" width={100} height={25} />
          </Box>
        </Stack>
      </Card>
    );
  }
  return (
    <Card className="card">
      <Header icon={<CalendarMonthIcon />} title="Your reservation" />
      <CardContent id="dateTime">
        {displayDateTime(booking.startAt, locationTimezone)}
        <Status bookingStatus={bookingStatus} />
      </CardContent>

      <Divider />
      <CardContent>
        <div id="bookingControl">
          <Button
            variant="outlined"
            disabled={disabled}
            size="large"
            color="info"
            startIcon={<UpdateIcon />}
            aria-label="change date/time"
            onClick={() => showEditDialog("date")}
          >
            Reschedule
          </Button>
          <LoadingButton
            variant="outlined"
            disabled={isCancelBtnDisabled}
            size="large"
            color="error"
            startIcon={<CancelIcon />}
            aria-label="cancel"
            onClick={cancel}
          >
            Cancel
          </LoadingButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateTime;
