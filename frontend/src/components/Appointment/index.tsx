import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
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
import { BusinessHours, LocationType } from "types/Location";
import { TeamMember } from "types/Team";
import { CatalogObject } from "types/Catalog";
import { Booking } from "types/Booking";
import { sendRequest, AxiosInterface } from "utils/request";
// import * as Yup from "yup";

interface AppointmentProps {
  businessHours: BusinessHours;
  catalogObjects: Array<CatalogObject>;
  members: Array<TeamMember>;
  sendRequest: (params: AxiosInterface) => Promise<void>;
  booking: Booking | null;
  setBooking: (booking: Booking) => void;
}

const Appointment = (props: AppointmentProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, onSelectStartAt] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string>("");
  const [activeStep, setActiveStep] = useState(0);
  /* const [skipped, setSkipped] = useState(new Set<number>());
     * const isStepOptional = (step: number) => {
     *   return step === 1;
     * };

     * const isStepSkipped = (step: number) => {
     *   return skipped.has(step);
     * }; */
  /* const handleNext = () => {
     *   let newSkipped = skipped;
     *   if (isStepSkipped(activeStep)) {
     *     newSkipped = new Set(newSkipped.values());
     *     newSkipped.delete(activeStep);
     *   }

     *   setActiveStep((prevActiveStep) => prevActiveStep + 1);
     *   setSkipped(newSkipped);
     * }; */

  /* const handleBack = () => {
   *   setActiveStep((prevActiveStep) => prevActiveStep - 1);
   * }; */

  /* const handleSkip = () => {
     *   if (!isStepOptional(activeStep)) {
     *     // You probably want to guard against something like this,
     *     // it should never occur unless someone's actively trying to break something.
     *     throw new Error("You can't skip a step that isn't optional.");
     *   }

     *   setActiveStep((prevActiveStep) => prevActiveStep + 1);
     *   setSkipped((prevSkipped) => {
     *     const newSkipped = new Set(prevSkipped.values());
     *     newSkipped.add(activeStep);
     *     return newSkipped;
     *   });
     * };
     */
  /* const handleReset = () => {
   *   setActiveStep(0);
   * }; */

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
        <LocationTeamMembers
          members={props.members}
          selectedMemberId={selectedMemberId}
          showOwner={false}
          setSelectedMemberId={setSelectedMemberId}
          goNext={() => setActiveStep(+1)}
        />
      ),
    },
    {
      label: "Select a service",
      component: (
        <SquareServices
          catalogObjects={props.catalogObjects}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      ),
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
    },
    {
      label: "Your information",
      component: <SquareCustomer setCustomerId={setCustomerId} />,
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
    <Paper sx={{ padding: 2, margin: 2 }} elevation={10} square>
      <Grid container alignItems="center" justifyContent="center" spacing={3}>
        <Grid item xs={2} md={2}>
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
          <Divider style={{ marginBottom: 15 }} />
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

        <Grid item xs={10} md={8}>
          {steps[activeStep].component}
        </Grid>

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
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(+1)}
            >
              next
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Appointment;
