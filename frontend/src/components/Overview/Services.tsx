import React from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Typography from "@mui/material/Typography";
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
  member: TeamMember | null;
  disabled: boolean;
  showEditDialog: (component: string) => void;
}

const ServicesOverview = ({
  appointmentSegments,
  catalogObject,
  member,
  disabled,
  showEditDialog,
}: ServicesProp) => (
  <Card className="card">
    {appointmentSegments.map((appointment, index) => (
      <React.Fragment key={index}>
        <CardContent>
          <Header icon={<ContentCutIcon />} title="Services" />
          <div className="serviceItem">
            <div>
              <Typography variant="body2" color="grey" component="div">
                {catalogObject.itemData.name}
              </Typography>
              <Typography variant="body2" color="grey" component="div">
                {catalogObject.itemData.description}
              </Typography>
            </div>
            <IconButton
              aria-label="edit"
              disabled={disabled}
              color="secondary"
              onClick={() => showEditDialog("service")}
            >
              <EditIcon />
            </IconButton>
          </div>
        </CardContent>
        {member && (
          <CardContent>
            <Divider />
            <AssignedStaff
              appointment={appointment}
              member={member}
              disabled={disabled}
              editStaff={() => showEditDialog("member")}
            />
          </CardContent>
        )}
      </React.Fragment>
    ))}
  </Card>
);
export default ServicesOverview;
