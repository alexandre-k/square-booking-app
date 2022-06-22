import React from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import EditIcon from "@mui/icons-material/Edit";
import { AppointmentSegment } from "types/Booking";
import { CatalogObject } from "types/Catalog";
import { TeamMember } from "types/Team";
import AssignedStaff from "components/Overview/AssignedStaff";
import Header from "components/Overview/Header";
import "./Services.css";

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
      <React.Fragment key={index}>
        <CardContent>
          <Header icon={<ContentCutIcon />} title="Services" />
          <div className="serviceItem">
            <div>
              <div>{catalogObject.itemData.name}</div>
              <div>{catalogObject.itemData.description}</div>
            </div>
            <IconButton aria-label="edit" color="secondary">
              <EditIcon />
            </IconButton>
          </div>
        </CardContent>
        <CardContent>
          <Divider />
          <AssignedStaff
            appointment={appointment}
            member={member}
            editStaff={() => console.log("TODO: Show staff dialog")}
          />
        </CardContent>
      </React.Fragment>
    ))}
  </Card>
);
export default Services;
