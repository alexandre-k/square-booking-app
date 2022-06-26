import { useState } from "react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import DateTimePicker from "components/Booking/DateTimePicker";
import Customer from "components/Booking/Customer";
import Services from "components/Booking/Services";
import TeamMembers from "components/Booking/TeamMembers";
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
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<Array<string>>([]);
  const [selectedStartAt, setSelectedStartAt] = useState<string>("");
  const [customer, setCustomer] = useState<User>({
    givenName: "",
    familyName: "",
    emailAddress: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  // const [disabled, setDisabled] = useState<boolean>(true);
    const changeRoute = useNavigate();
    const navigate = (step: number) => {
        const nextActiveStep = activeStep + step;
        if (nextActiveStep === -1) {
            changeRoute("/");
        }
        setActiveStep(nextActiveStep);
    };
    const { isLoading, isError, isSuccess, mutate, error } = useMutation<BookingT, AxiosError>(
        () => bookAppointment(customer, selectedStartAt, selectedServices, selectedMemberId), {
            // @ts-ignore
            onSuccess: ( data) => {

                // @ts-ignore
                changeRoute("/completed/" + data.booking.id);
            }
        }
    );

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
    },
    {
      label: "Select a team member",
      component: (
        <TeamMembers
          selectedMemberId={selectedMemberId}
          showOwner={false}
          setSelectedMemberId={setSelectedMemberId}
          goNext={() => {
            setActiveStep(activeStep + 1);
          }}
        />
      ),
      isNextRequired: false,
    },
    {
      label: "Pick a date/time",
      component: (
        <DateTimePicker
          selectedServices={selectedServices}
          memberId={selectedMemberId}
          selectedStartAt={selectedStartAt}
          setSelectedStartAt={setSelectedStartAt}
        />
      ),
      isNextRequired: true,
    },
    {
      label: "Your information",
      component: <Customer customer={customer} setCustomer={setCustomer} />,
      isNextRequired: true,
    },
  ];



  return (
    <div id="bookingContainer">
      <div>
        <IconButton color="primary" size="large" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          {activeStep === 0 ? "Home" : steps[activeStep].label}
        </Typography>
      </div>

      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel style={{ marginBottom: 20 }}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div id="bookingGrid">{steps[activeStep].component}</div>
      {steps[activeStep].isNextRequired && (
        <div>
          {activeStep === steps.length - 1 ? (
              <Button
                className="businessNameButton"
                variant="contained"
                size="large"
                disabled={isLoading}
                onClick={() => mutate()}
                endIcon={<CheckIcon />}
              >
                Book
              </Button>
          ) : (
            <Button
              disabled={false}
              variant="contained"
              size="large"
              onClick={() => navigate(+1)}
            >
              next
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;
