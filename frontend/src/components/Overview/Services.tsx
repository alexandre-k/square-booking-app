import React from "react";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { AppointmentSegment } from "types/Booking";
import { CatalogObject, CatalogObjectItemVariation } from "types/Catalog";
import { TeamMember } from "types/Team";
import AssignedStaff from "components/Overview/AssignedStaff";
import Header from "components/Overview/Header";
import "./Services.css";

interface ServicesProp {
  appointmentSegments: Array<AppointmentSegment>;
  catalogObjects: Array<CatalogObject>;
  catalogObjectItemVariations: Array<CatalogObjectItemVariation>;
  member: TeamMember | null;
  disabled: boolean;
  isLoading: boolean;
  showEditDialog: (component: string) => void;
}

const ServicesOverview = ({
  appointmentSegments,
  catalogObjects,
  catalogObjectItemVariations,
  member,
  disabled,
  isLoading,
  showEditDialog,
}: ServicesProp) => {
  if (isLoading) {
    return (
      <Card className="card">
        <Stack spacing={1}>
          <Skeleton variant="text" width={100} />
          <Skeleton variant="rectangular" width={310} height={118} />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="rectangular" width={310} height={118} />
        </Stack>
      </Card>
    );
  }
  const firstAppointment = appointmentSegments.find(Boolean);
  return (
    <Card className="card">
      <CardHeader
        title={<Header icon={<ContentCutIcon />} title="Services" />}
      />
      {appointmentSegments.map((appointment, index) => {
        const catalogObjectItemVariation = catalogObjectItemVariations.find(
          (obj: CatalogObjectItemVariation) =>
            appointment.serviceVariationId === obj.id
        );

        if (catalogObjectItemVariation === undefined)
          return <div>Unable to find a related service variation</div>;

        const catalogObject = catalogObjects.find(
          (obj: CatalogObject) =>
            catalogObjectItemVariation.itemVariationData.itemId === obj.id
        );

        if (catalogObject === undefined)
          return <div>Unable to find a related service</div>;
        return (
          <React.Fragment key={index}>
            <CardContent>
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
          </React.Fragment>
        );
      })}
      {member && firstAppointment && (
        <>
          <Divider />
          <CardHeader
            title={<Header icon={<PeopleIcon />} title="Team member" />}
          />
          <CardContent>
            <AssignedStaff
              anyTeamMember={firstAppointment.anyTeamMember}
              member={member}
              disabled={disabled}
              editStaff={() => showEditDialog("member")}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};
export default ServicesOverview;
