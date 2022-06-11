import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import SquareBooking from "./SquareBooking";
import SquareCustomer from "./SquareCustomer";
import SquareServices from "./SquareServices";
import LocationTeamMembers from "./SquareTeamMembers";
import { Location, LocationType } from "types/Location";
import { TeamMember } from "types/Team";
import { CatalogObject } from "types/Catalog";
import { sendRequest, AxiosInterface } from "utils/request";
// import * as Yup from "yup";

interface AppointmentProps {
  location: Location | undefined;
  catalogObjects: Array<CatalogObject>;
  members: Array<TeamMember>;
  sendRequest: (params: AxiosInterface) => Promise<void>;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
}

const Appointment = (props: AppointmentProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, onSelectStartAt] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string>("");

  /* const validateCustomer = Yup.object({
     *     firstName: Yup.string()
     *                   .max(30, "Must be 30 characters or less")
     *                   .required("Required"),
     *     lastName: Yup.string()
     *                  .max(30, "Must be 30 characters or less")
     *                  .required("Required"),
     *     email: Yup.string().email("Invalid email address").required("Required"),
     * })

     */
  const bookAppointment = async () => {
    const data = await sendRequest({
      url: "/bookings",
      method: "POST",
      payload: {
        booking: {
          customer_id: customerId,
          customer_note: "",
          location_id: process.env.REACT_APP_SQUARE_LOCATION_ID,
          location_type: LocationType.BUSINESS_LOCATION,
          seller_note: "",
          start_at: selectedStartAt,
          appointment_segments: selectedServices.map((service) => {
            return {
              service_variation_id: service,
              team_member_id: selectedMemberId,
              service_variation_version: 1,
            };
          }),
        },
      },
    });
    console.log("TODO: if error notify the user", data);
  };
  return (
    <>
      <Paper sx={{ padding: 2, margin: 2 }} elevation={10} square>
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          <Grid item xs={1} md={1}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton color="primary" size="large">
                <ArrowBackIosNewIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={11} md={11}>
            <Typography variant="h6" color="inherit" component="div">
              Home
            </Typography>
          </Grid>
          <Divider style={{ marginTop: 15, marginBottom: 15 }} />

          <Grid item xs={10} md={10}>
            <LocationTeamMembers
              members={props.members}
              selectedMemberId={selectedMemberId}
              showOwner={false}
              setSelectedMemberId={setSelectedMemberId}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
          </Grid>
          <Grid item xs={10} md={10}>
            <SquareServices
              catalogObjects={props.catalogObjects}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
          </Grid>

          <Grid item xs={12} md={12}>
            {props.location === undefined ? (
              <div>Location not found</div>
            ) : (
              <SquareBooking
                businessHours={props.location.business_hours.periods}
                selectedServices={selectedServices}
                memberId={selectedMemberId}
                selectedStartAt={selectedStartAt}
                onSelectStartAt={onSelectStartAt}
              />
            )}
          </Grid>

          <Grid item xs={12} md={12}>
            <SquareCustomer setCustomerId={setCustomerId} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{ marginBottom: 15, paddingBottom: 25 }}
          >
            <Link to="/completed" style={{ textDecoration: "none" }}>
              <Button
                className="businessNameButton"
                variant="contained"
                size="large"
                endIcon={<CheckIcon />}
                onClick={bookAppointment}
              >
                Book
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Appointment;
