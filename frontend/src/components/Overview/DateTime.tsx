import Button from "@mui/material/Button";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UpdateIcon from "@mui/icons-material/Update";
import Header from "components/Overview/Header";
import Status from "components/Overview/Status";
import { Booking, BookingStatus, Color } from "types/Booking";
import dayjs from "dayjs";

interface DateTimeProps {
  booking: Booking;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  cancelBooking: (bookingId: string) => Promise<void>;
  setOpenRescheduleDialog: (open: boolean) => void;
}

const DateTime = ({
  booking,
  loading,
  setLoading,
  cancelBooking,
  setOpenRescheduleDialog,
}: DateTimeProps) => {
  const cancel = async () => {
    setLoading(true);
    await cancelBooking(booking.id);
    setLoading(false);
    console.log("TODO: Reload booking summary page");
  };

  const displayDateTime = (startAt: string) => {
    const date = dayjs(startAt);
    return (
      <div className="dateTime">
        <div>{date.format("dddd DD MMMM")}</div>
        <div>{date.format("hh:mm a")}</div>
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
    const isCancelBtnDisabled = booking.status !== BookingStatus.ACCEPTED && booking.status !== BookingStatus.PENDING

  return (
    <Card className="card">
      <Header icon={<CalendarMonthIcon />} title="Your reservation" />
      <CardContent id="dateTime">
        {displayDateTime(booking.startAt)}
        <Status bookingStatus={bookingStatus} />
      </CardContent>

      <Divider />
      <CardContent>
        <div id="bookingControl">
          <Button
            variant="outlined"
            size="large"
            color="info"
            startIcon={<UpdateIcon />}
            aria-label="change date/time"
            onClick={() => setOpenRescheduleDialog(true)}
          >
            Reschedule
          </Button>
          <LoadingButton
            variant="outlined"
              disabled={isCancelBtnDisabled}
            loading={loading}
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
