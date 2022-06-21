import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { AppointmentSegment } from "types/Booking";
import { CatalogObject } from "types/Catalog";
import { TeamMember } from "types/Team";
import AssignedStaff from "components/Overview/AssignedStaff";
import Header from "components/Overview/Header";

interface ServicesProp {
  appointmentSegments: Array<AppointmentSegment>;
  catalogObject: CatalogObject;
  member: TeamMember;
}

const Services = ({
  appointmentSegments,
  catalogObject,
  member,
}: ServicesProp) => (
  <Card className="card">
    {appointmentSegments.map((appointment, index) => (
      <>
        <CardContent key={index}>
          <Header icon={<ContentCutIcon />} title="Services" />
          <div>{catalogObject.itemData.name}</div>
          <div>{catalogObject.itemData.description}</div>
          Duration {appointment.durationMinutes}min.
        </CardContent>

        <CardContent>
          <Divider />
          <AssignedStaff appointment={appointment} member={member} />
        </CardContent>
      </>
    ))}
  </Card>
);
export default Services;
