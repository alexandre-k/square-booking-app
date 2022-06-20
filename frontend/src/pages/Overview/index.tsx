import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "components/Loading";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  AppointmentSegment,
  Booking,
  TeamMemberBookingProfile,
} from "types/Booking";
import { PaymentLink } from "types/Checkout";
import { CatalogObject, CatalogObjectItem } from "types/Catalog";
import "./index.css";
import { sendRequest } from "utils/request";
import dayjs from "dayjs";

/* interface OverviewProps {
 *   booking: Booking;
 * } */

const Overview = () => {
  //{ booking }: OverviewProps) => {
  const [memberProfile, setMemberProfile] =
    useState<TeamMemberBookingProfile | null>(null);
  const [catalogObject, setCatalogObject] = useState<CatalogObject | null>(
    null
  );
  const [booking, setBooking] = useState<Booking | null>(null);
    const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const { isAuthenticated, user } = useAuth0<{ name: string }>();

  const getBooking = async (email: string) => {
    const data = await sendRequest("/customer/booking?email=" + email, "GET");
    if (data === -1) {
      console.log("TODO: if error notify the user", data);
      return null;
    }
    return data;
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
      <div className="dateTime">
        <div>{date.format("dddd DD MMMM")}</div>
        <div>{date.format("hh:mm a")}</div>
      </div>
    );
  };

  useEffect(() => {
    // @ts-ignore
    if (booking === null && user) {
      getBooking(user.name).then(
        ({ booking, teamMemberBookingProfile, object, paymentLink }) => {
          setBooking(booking);
          setMemberProfile(teamMemberBookingProfile);
          setCatalogObject(object);
            setPaymentLink(paymentLink);
          // @ts-ignore
          /* if (booking.appointmentSegments.length > 0) {
           *   const appointment = booking.appointmentSegments[0];
           *   // retrieveTeamMemberProfile(appointment.teamMemberId);
           *   retrieveCatalogObject(appointment.serviceVariationId);
           * } */
        }
      );
    }
  }, [booking]);

  if (booking === null) {
    return <Loading />;
  }

  const cancel = () => {
    console.log("Cancel > ", booking);
  };

  const reschedule = () => {
    console.log("Reschedule > ", booking);
  };

  return (
    <div className="summaryGrid">
      <Card className="card">
        <CardHeader title="Appointment" />
        <CardContent id="dateTime">
          {displayDateTime(booking.startAt)}

          <Chip
            label={booking.status.toLowerCase()}
            color="primary"
            size="small"
          />
        </CardContent>

        <Divider />
        <CardContent>
          <div id="bookingControl">
            <Button
              variant="outlined"
              size="large"
              color="info"
              startIcon={<CalendarMonthIcon />}
              aria-label="change date/time"
              onClick={reschedule}
            >
              Reschedule
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="error"
              startIcon={<CancelIcon />}
              aria-label="cancel"
              onClick={reschedule}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
      {booking !== null && (
        <Card className="card">
          <CardContent>
            {booking.appointmentSegments.map((appointment, index) => (
              <div key={index}>
                <p>Services</p>
                {catalogObject === null
                  ? ""
                  : displayCatalogObject(catalogObject.itemData)}
                Duration {appointment.durationMinutes}min.
                <Divider />
                <p>Team member</p>
                {displayName(appointment)}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      {paymentLink !== null && (
          <Card className="card">
              <CardContent>
                  payments
                  <iframe src={paymentLink.url + "&output=embed"}></iframe>
              </CardContent>
          </Card>
      )}
    </div>
  );
};

export default Overview;
