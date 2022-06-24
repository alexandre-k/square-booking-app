import Typography from "@mui/material/Typography";
import "./NoBookingFound.css";

interface NoBookingFoundProps {
    title: string;
    text?: string;
}

const NoBookingFound = ({ title, text }: NoBookingFoundProps) => (
  <div id="noBookingFoundContainer">
    <Typography variant="h4">{title}</Typography>
    {text && <Typography variant="body1">{text}</Typography>}
  </div>
);

export default NoBookingFound;
