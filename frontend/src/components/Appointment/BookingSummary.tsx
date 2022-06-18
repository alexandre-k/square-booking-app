import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import {
  AppointmentSegment,
  Booking,
  TeamMemberBookingProfile,
} from "types/Booking";
import { CatalogObject, CatalogObjectItem } from "types/Catalog";
import "./BookingSummary.css";
import { sendRequest } from "utils/request";
import dayjs from "dayjs";

interface BookingSummaryProps {
  booking: Booking;
}

const BookingSummary = (props: BookingSummaryProps) => {
  const [memberProfile, setMemberProfile] =
    useState<TeamMemberBookingProfile | null>(null);
  const [catalogObject, setCatalogObject] = useState<CatalogObject | null>(
    null
  );
  const retrieveTeamMemberProfile = async (teamMemberId: string) => {
    const data = await sendRequest(
      "/bookings/team-member-booking-profiles/" + teamMemberId,
      "GET"
    );
    if (data === -1) {
      console.log("TODO: if error notify the user", data);
      return;
    }
    setMemberProfile(data.teamMemberBookingProfile);
  };

  const retrieveCatalogObject = async (serviceVariationId: string) => {
    const data = await sendRequest(
      "/catalog/object/" + serviceVariationId,
      "GET"
    ).then(async (itemVariation) => {
      const itemId = itemVariation?.object?.itemVariationData?.itemId;
      if (!itemId) return -1;
      return await sendRequest("/catalog/object/" + itemId, "GET");
    });
    if (data === -1) {
      console.log("TODO: if error notify the user", data);
      return;
    }
    setCatalogObject(data.object);
  };

  const displayName = (appointment: AppointmentSegment) => {
    if (appointment.anyTeamMember) return "Any";
    if (memberProfile !== null) return memberProfile.displayName;
    return "";
  };

  const displayCatalogObject = (catalogObjectItem: CatalogObjectItem) => {
    return (
      <>
        <div>{catalogObjectItem.name}</div>
        <div>{catalogObjectItem.description}</div>
      </>
    );
  };

  const displayDateTime = (startAt: string) => {
    const date = dayjs(startAt);
    return (
      <>
        <div>{date.format("ddd")}</div>
        <div>{date.format("DD")}</div>
        <div>{date.format("MMM")}</div>
        <div>{date.format("hh:mm a")}</div>
      </>
    );
  };

  useEffect(() => {
    // @ts-ignore
    const booking = props.booking;
    if (booking && booking.appointmentSegments.length > 0) {
      const appointment = booking.appointmentSegments[0];
      retrieveTeamMemberProfile(appointment.teamMemberId);
      retrieveCatalogObject(appointment.serviceVariationId);
    }
  }, [props.booking]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      rowSpacing={5}
    >
      <Grid item xs={12} md={12}>
        <Card className="card">
          <CardHeader title="Appointment" />
          {displayDateTime(props.booking.startAt)}
          <Chip
            label={props.booking.status.toLowerCase()}
            color="primary"
            size="small"
          />
        </Card>
      </Grid>
      {props.booking !== null &&
        props.booking.appointmentSegments.map((appointment, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} md={12}>
              <Card className="card">
                <CardHeader title="Team member" />
                <CardContent>{displayName(appointment)}</CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card className="card">
                <CardHeader title="Services" />
                <CardContent>
                  {catalogObject === null
                    ? ""
                    : displayCatalogObject(catalogObject.itemData)}
                  Duration {appointment.durationMinutes}min.
                </CardContent>
              </Card>
            </Grid>
          </React.Fragment>
        ))}
    </Grid>
  );
};

export default BookingSummary;
