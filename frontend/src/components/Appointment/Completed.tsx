import Typography from "@mui/material/Typography";
import { Booking } from "types/Booking";
import BookingSummary from "./BookingSummary";
import Loading from "components/Loading";

interface CompletedProps {
  booking: Booking | null;
}

const Completed = ({ booking }: CompletedProps) => {
  if (booking === null) return <Loading />;
  return (
    <>
      <Typography variant="h4" color="inherit">
        Appointment booked!
      </Typography>
      <BookingSummary booking={booking} />
    </>
  );
};

export default Completed;
