import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { AppointmentSegment } from "types/Booking";
import { CatalogObject, CatalogObjectItemVariation } from "types/Catalog";
import { useLocation } from "context/LocationProvider";
import { localizedDate } from "utils/dateTime";
import { ICalendar, CalendarOptions } from "datebook";
import "./ExportToCalendar.css";

interface ExportToCalendarProps {
  isLoading: boolean;
  appointmentSegments: Array<AppointmentSegment>;
  services: Array<CatalogObject>;
}

const ExportToCalendar = ({
  isLoading,
  appointmentSegments,
  services,
}: ExportToCalendarProps) => {
  const { isLoading: isLocationLoading, isError, location, error } = useLocation();
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
    description: "Let's blow off some steam with a tall cold one!",
    start: localizedDate("2022-07-08T19:00:00", location.timezone).toDate(),
    end: localizedDate("2022-07-08T19:00:00", location.timezone).toDate(),
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
