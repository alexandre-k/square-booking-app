import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ICalendar, CalendarOptions } from "datebook";
import "./ExportToCalendar.css";

interface ExportToCalendarProps {
  isLoading: boolean;
}

const ExportToCalendar = ({ isLoading }: ExportToCalendarProps) => {
  const config: CalendarOptions = {
    title: "Happy Hour",
    location: "The Bar, New York, NY",
    description: "Let's blow off some steam with a tall cold one!",
    start: new Date("2022-07-08T19:00:00"),
    end: new Date("2022-07-08T23:30:00"),
  };
  const addToCalendar = () => {
    const icalendar = new ICalendar(config);
    icalendar.download();
  };
  if (isLoading) {
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
