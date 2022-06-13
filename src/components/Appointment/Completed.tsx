import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Booking } from "types/Booking";
import BookingSummary from "./BookingSummary";
import "./Completed.css";

interface CompletedProps {
  booking: Booking | null;
}

const Completed = (props: CompletedProps) => {
    const progressCircle = <div className="progressCircleContainer">
        <CircularProgress size="100px" />
    </div>

  return (
      <>
        <Typography variant="h4" color="inherit">
          Appointment booked!
        </Typography>
      {props.booking !== null ? <BookingSummary booking={props.booking} />:progressCircle};
      </>);
};

export default Completed;
