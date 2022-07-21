import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import DateTimePicker from "components/Booking/DateTimePicker";
import Customer from "components/Booking/Customer";
import Services from "components/Booking/Services";
import TeamMembers from "components/Booking/TeamMembers";
import { useMagicLogin } from "context/MagicLoginProvider";
import { Service } from "types/Catalog";
import { User } from "types/Customer";
import { Booking as BookingT } from "types/Booking";
import { bookAppointment } from "api/booking";
import { customerSchema } from "utils/customer";
import { getBrowserTimezone } from "utils/dateTime";
import { useLocation } from "context/LocationProvider";
import "./index.css";

interface BookingProps {
  booking: BookingT | null;
  setBooking: (booking: BookingT) => void;
}

const Booking = (props: BookingProps) => {
  const {
    hasSavedMetadata,
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
    login,
    jwt: savedJwt,
  } = useMagicLogin();

  const {
    isError: isLocationError,
    location,
  } = useLocation();

  const [selectedMemberIds, setSelectedMemberIds] = useState<Array<string>>([]);
  const [selectedServices, setSelectedServices] = useState<Array<Service>>([]);
  const [selectedUTCStartAt, setSelectedUTCStartAt] = useState<string | null>(null);
  const [customer, setCustomer] = useState<User>({
    givenName: "",
    familyName: "",
    emailAddress: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const changeRoute = useNavigate();

  useEffect(() => {
    if (!!user && !!user.email) {
      setCustomer({
        givenName: "",
        familyName: "",
        emailAddress: user.email !== null ? user.email : "",
      });
    }
  }, [user]);

  const navigate = (step: number) => {
    const nextActiveStep = activeStep + step;
    if (nextActiveStep === -1) {
      changeRoute("/");
    }
    setActiveStep(nextActiveStep);
  };
  const bookingMutation = useMutation(
    (jwt: string) =>
      bookAppointment(
        customer,
        selectedUTCStartAt,
        selectedServices,
        selectedMemberIds,
        jwt
      ),
    {
      onSuccess: (data) => {
        changeRoute("/overview/" + data.booking.id);
      },
      onError: (error) => {
          console.log('Error > ', error)
      }
    }
  );

  if (isLocationError) {
    return <div>Location error. Unable to retrieve current location</div>;
  }

  const steps = [
    {
      label: "Select a service",
      component: (
        <Services
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      ),
      isNextRequired: true,
      isFormValid: () => selectedServices.length > 0,
    },
    {
      label: "Select a team member",
      component: (
        <TeamMembers
          selectedMemberIds={selectedMemberIds}
          showOwner={false}
          onDone={(memberIds: Array<string>) => {
            setSelectedMemberIds(memberIds);
            setActiveStep(activeStep + 1);
          }}
        />
      ),
      isNextRequired: false,
      isFormValid: () => selectedMemberIds.length > 0,
    },
    {
      label: "Pick a date/time",
      component: (
        <DateTimePicker
          selectedServices={selectedServices}
          memberIds={selectedMemberIds}
          selectedUTCStartAt={selectedUTCStartAt}
          setSelectedUTCStartAt={setSelectedUTCStartAt}
          timezone={!!location ? location.timezone : getBrowserTimezone()}
        />
      ),
      isNextRequired: true,
      isFormValid: () => !!selectedUTCStartAt,
    },
    {
      label: "Your information",
      component: (
        <Customer
          customer={customer}
          setCustomer={setCustomer}
          isAuthenticated={isAuthenticated}
          isAuthLoading={isAuthLoading}
          hasSavedMetadata={hasSavedMetadata}
        />
      ),
      isNextRequired: true,
      isFormValid: () => customerSchema.isValidSync(customer),
    },
  ];

  return (
    <div id="bookingContainer">
      <div id="buttonContainer">
        <div id="previousContainer">
          <IconButton
            style={{ marginRight: "10px" }}
            aria-label="previous"
            color="primary"
            size="large"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {activeStep === 0 ? "Home" : steps[activeStep].label}
          </Typography>
        </div>
        {steps[activeStep].isNextRequired && (
          <div>
            {activeStep === steps.length - 1 ? (
              <LoadingButton
                className="businessNameButton"
                variant="contained"
                size="large"
                disabled={!steps[activeStep].isFormValid()}
                loading={bookingMutation.isLoading || isAuthLoading}
                onClick={async () => {
                  const { jwt: newJwt } = await login(
                    customer.emailAddress
                  );
                  const jwt = !!savedJwt ? savedJwt : newJwt;
                  if (!jwt) throw Error("Unable to authenticate");
                  bookingMutation.mutate(jwt);
                }}
                endIcon={<CheckIcon />}
              >
                Book
              </LoadingButton>
            ) : (
              <Button
                disabled={!steps[activeStep].isFormValid()}
                aria-label="next"
                color="primary"
                size="large"
                onClick={() => navigate(+1)}
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
              >
                Next
              </Button>
            )}
          </div>
        )}
      </div>

      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel style={{ marginBottom: 20 }}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div id="bookingGrid">{steps[activeStep].component}</div>
    </div>
  );
};

export default Booking;
