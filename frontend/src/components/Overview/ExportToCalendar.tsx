import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Booking } from "types/Booking";
import { CatalogObject } from "types/Catalog";
import { useLocation } from "context/LocationProvider";
import { addAppointmentDuration, localizedDate } from "utils/dateTime";
import { ICalendar, CalendarOptions } from "datebook";
import "./ExportToCalendar.css";

interface ExportToCalendarProps {
  isLoading: boolean;
  booking: Booking;
  services: Array<CatalogObject>;
}

const ExportToCalendar = ({
  isLoading,
  booking,
  services,
}: ExportToCalendarProps) => {
  const {
    isLoading: isLocationLoading,
    isError,
    location,
    error,
  } = useLocation();
  if (isLoading || isLocationLoading || !location) {
    return (
      <Card className="card">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rectangular" width={100} height={25} />
        </Box>
      </Card>
    );
  }
  const config: CalendarOptions = {
    title: location.name,
    location: location.address.addressLine1,
    description: "Appointment at " + location.name,
    start: localizedDate(booking.startAt, location.timezone).toDate(),
    end: addAppointmentDuration(
      localizedDate(booking.startAt, location.timezone),
      booking.appointmentSegments
    ).toDate(),
  };
  const addToCalendar = () => {
    const icalendar = new ICalendar(config);
    icalendar.download();
  };
  return (
    <Card className="card">
      <CardContent id="exportContainer">
        <Button
          variant="contained"
          aria-label="add-to-calendar"
          color="primary"
          endIcon={<FileDownloadIcon />}
          onClick={() => addToCalendar()}
        >
          Add to calendar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExportToCalendar;
