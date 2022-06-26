import Typography from "@mui/material/Typography";
import { Booking } from "types/Booking";
import BookingSummary from "pages/Overview";
import Loading from "components/Loading";

interface CompletedProps {
  bookingId: string;
}

const Completed = ({ bookingId }: CompletedProps) => {
  if (bookingId === null) return <Loading />;
  return (
    <>
      <Typography variant="h4" color="inherit">
        Appointment booked!
      </Typography>
      <BookingSummary />
    </>
  );
};

export default Completed;
