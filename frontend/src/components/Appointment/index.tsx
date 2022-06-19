import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import SquareBooking from "./SquareBooking";
import SquareCustomer from "./SquareCustomer";
import SquareServices from "./SquareServices";
import SquareTeamMembers from "./SquareTeamMembers";
import { User } from "types/Customer";
import { BusinessHours } from "types/Location";
import { TeamMember } from "types/Team";
import { CatalogObject } from "types/Catalog";
import { Booking } from "types/Booking";
import { sendRequest } from "utils/request";
import "./index.css";
// import * as Yup from "yup";

interface AppointmentProps {
  businessHours: BusinessHours;
  sendRequest: (url: string, method: string, payload: object) => Promise<void>;
  booking: Booking | null;
  setBooking: (booking: Booking) => void;
}

const Appointment = (props: AppointmentProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, onSelectStartAt] = useState<string | null>(null);
  const [catalogObjects, setCatalogObjects] = useState<CatalogObject[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [customer, setCustomer] = useState<User>({
    givenName: "",
    familyName: "",
    emailAddress: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const getTeamMembers = async () => {
    const teamMembers = await sendRequest("/staff/search", "POST");
    const members = teamMembers
      .filter((m: TeamMember) => !m.isOwner)
      .map((member: TeamMember) => ({
          ...member,
            avatarUrl: `https://ui-avatars.com/api/?name=${member.givenName}+${member.familyName}.jpg`,
        }
      ));
    setMembers(members);
  };
  const getCatalogObjects = async () => {
    const services = await sendRequest("/services/objects", "GET");
    setCatalogObjects(services);
  };

  useEffect(() => {
    if (members.length === 0) getTeamMembers();

    if (catalogObjects.length === 0) getCatalogObjects();
  }, []);
  const bookAppointment = async () => {
    const data = await sendRequest("/booking/create", "POST", {
      booking: {
        ...customer,
        customerNote: "",
        locationId: process.env.REACT_APP_SQUARE_LOCATION_ID,
        // locationType: LocationType.BUSINESS_LOCATION,
        // sellerNote: "",
        startAt: selectedStartAt,
        appointmentSegments: selectedServices.map((service) => {
          return {
            durationMinutes: 30,
            serviceVariationId: service,
            teamMemberId: selectedMemberId,
            serviceVariationVersion: 1,
          };
        }),
      },
    });
    if (data === -1 || !data.booking) {
      console.log("TODO: if error notify the user", data);
      return;
    }
    props.setBooking(data.booking);
  };

  const steps = [
    {
      label: "Select a team member",
      component: (
        <SquareTeamMembers
          members={members}
          selectedMemberId={selectedMemberId}
          showOwner={false}
          setSelectedMemberId={setSelectedMemberId}
          goNext={() => setActiveStep(+1)}
        />
      ),
      isNextRequired: false
    },
    {
      label: "Select a service",
      component: (
        <SquareServices
          catalogObjects={catalogObjects}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      ),
      isNextRequired: true
    },
    {
      label: "Pick a date/time",
      component: (
        <SquareBooking
          businessHours={props.businessHours.periods}
          selectedServices={selectedServices}
          memberId={selectedMemberId}
          selectedStartAt={selectedStartAt}
          onSelectStartAt={onSelectStartAt}
        />
      ),
      isNextRequired: true
    },
    {
      label: "Your information",
      component: (
        <SquareCustomer customer={customer} setCustomer={setCustomer} />
      ),
      isNextRequired: true
    },
  ];

  const changeRoute = useNavigate();
  const navigate = (step: number) => {
    const nextActiveStep = activeStep + step;
    if (nextActiveStep === -1) {
      changeRoute("/");
    }
    setActiveStep(nextActiveStep);
  };

  return (
    <Grid
      id="bookingGrid"
      container
      alignItems="start"
      justifyContent="space-evenly"
    >
      <Grid item xs={1} md={1}>
        <IconButton color="primary" size="large" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Grid>
      <Grid item xs={10} md={10}>
        <Typography variant="h6" color="inherit" component="div">
          {activeStep === 0 ? "Home" : steps[activeStep].label}
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel style={{ marginBottom: 20 }}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      <Grid item xs={12} md={12}>
        {steps[activeStep].component}
      </Grid>
      {steps[activeStep].isNextRequired &&
      <Grid item xs={12} md={12}>
        {activeStep === steps.length - 1 ? (
          <Link
            to={{
              pathname: `/completed/${
                props.booking === null ? "" : props.booking.id
              }`,
            }}
            onClick={bookAppointment}
            style={{ textDecoration: "none" }}
          >
            <Button
              className="businessNameButton"
              variant="contained"
              size="large"
              endIcon={<CheckIcon />}
            >
              Book
            </Button>
          </Link>
        ) : (
          <Button disabled={false} variant="contained" size="large" onClick={() => navigate(+1)}>
            next
          </Button>
        )}
      </Grid>}
    </Grid>
  );
};

export default Appointment;
