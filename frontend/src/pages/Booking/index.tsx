import { useState } from "react";
import { AxiosError } from "axios";
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
import "./index.css";
// import * as Yup from "yup";

interface BookingProps {
  booking: BookingT | null;
  setBooking: (booking: BookingT) => void;
}

const Booking = (props: BookingProps) => {
  const { isLoading: isAuthLoading, isAuthenticated, error: authError, user, login } = useMagicLogin();
  const [selectedMemberIds, setSelectedMemberIds] = useState<Array<string>>([]);
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, setSelectedStartAt] = useState<string>("");
  const [customer, setCustomer] = useState<User>({
    givenName: "",
    familyName: "",
    emailAddress: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const changeRoute = useNavigate();
  const navigate = (step: number) => {
    const nextActiveStep = activeStep + step;
    if (nextActiveStep === -1) {
      changeRoute("/");
    }
    setActiveStep(nextActiveStep);
  };
  const { isLoading, isError, isSuccess, mutate, error } = useMutation<
    BookingT,
    AxiosError
  >(
    () =>
      bookAppointment(
        customer,
        selectedStartAt,
        selectedServices,
        selectedMemberIds
      ),
    {
      // @ts-ignore
      onSuccess: (data) => {
        // @ts-ignore
        changeRoute("/overview/" + data.booking.id);
      },
    }
  );

  const steps = [
    {
      label: "Select a service",
      component: (
        <Services
          selectedServices={selectedServices}
          onDone={(services: Array<Service>) =>
            setSelectedServices(services.map((service) => service.id))
          }
        />
      ),
      isNextRequired: true,
      isFormBlank: () => selectedServices.length === 0
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
      isFormBlank: () => selectedMemberIds === []
    },
    {
      label: "Pick a date/time",
      component: (
        <DateTimePicker
          selectedServices={selectedServices}
          memberIds={selectedMemberIds}
          selectedStartAt={selectedStartAt}
          setSelectedStartAt={setSelectedStartAt}
        />
      ),
      isNextRequired: true,
      isFormBlank: () => selectedStartAt === ""
    },
    {
      label: "Your information",
      component: <Customer customer={customer} setCustomer={setCustomer} />,
      isNextRequired: true,
      isFormBlank: () => customer.emailAddress === ""
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
                disabled={steps[activeStep].isFormBlank()}
                loading={isLoading || isAuthLoading || !isAuthenticated}
                onClick={async () => {
                  await login(customer.emailAddress);
                  mutate()
                }}
                endIcon={<CheckIcon />}
              >
                Book
              </LoadingButton>
            ) : (
                <Button
                    disabled={steps[activeStep].isFormBlank()}
                    aria-label="next"
                    color="primary"
                    size="large"
                    onClick={() => navigate(+1)}
                    variant="contained" endIcon={

                    <ArrowForwardIosIcon />
                    }>
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
