import Chip from "@mui/material/Chip";
import { Color } from "types/Booking";

interface StatusProps {
  bookingStatus: { label: string; color: Color; icon: JSX.Element };
}

const Status = ({ bookingStatus }: StatusProps) => {
  return (
    <Chip
      style={{ padding: 7 }}
      icon={bookingStatus.icon}
      label={bookingStatus.label}
      color={bookingStatus.color}
    />
  );
};

export default Status;
