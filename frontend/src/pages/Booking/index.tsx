import { useEffect, useState } from "react";
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
import { BusinessHours, DayOfWeek } from "types/Location";
import { TeamMember } from "types/Team";
import { CatalogObject } from "types/Catalog";
import { Booking as BookingT } from "types/Booking";
import { sendRequest } from "utils/request";
import "./index.css";
// import * as Yup from "yup";

interface BookingProps {
  booking: BookingT | null;
  setBooking: (booking: BookingT) => void;
}

const Booking = (props: BookingProps) => {
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
  // const [disabled, setDisabled] = useState<boolean>(true);
  const getTeamMembers = async () => {
    const teamMembers = await sendRequest("/staff/search", "POST");
    const members = teamMembers
      .filter((m: TeamMember) => !m.isOwner)
      .map((member: TeamMember) => ({
        ...member,
        avatarUrl: `https://ui-avatars.com/api/?name=${member.givenName}+${member.familyName}.jpg`,
      }));
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

  const businessHours = {
    periods: [
      {
        dayOfWeek: DayOfWeek.MONDAY,
        startLocalTime: "9:00",
        endLocalTime: "17:00",
      },
    ],
  };

  const steps = [
    {
      label: "Select a service",
      component: (
        <Services
          catalogObjects={catalogObjects}
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
          members={members}
          selectedMemberId={selectedMemberId}
          showOwner={false}
          setSelectedMemberId={setSelectedMemberId}
          goNext={() => {setActiveStep(activeStep + 1)}}
        />
      ),
      isNextRequired: false,
    },
    {
      label: "Pick a date/time",
      component: (
        <DateTimePicker
          businessHours={businessHours.periods}
          selectedServices={selectedServices}
          memberId={selectedMemberId}
          selectedStartAt={selectedStartAt}
          onSelectStartAt={onSelectStartAt}
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

  const changeRoute = useNavigate();
  const navigate = (step: number) => {
    const nextActiveStep = activeStep + step;
    if (nextActiveStep === -1) {
      changeRoute("/");
    }
    setActiveStep(nextActiveStep);
  };

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
