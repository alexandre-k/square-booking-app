import { Address, Location, Period } from "types/Location";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

interface SquareLocationProps {
  locations: Array<Location>;
}

const SquareLocation = (props: SquareLocationProps) => {
  const location = props.locations[0];

  const formatContact = (address: Address) => {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <IconButton
                color="secondary"
                aria-label="show location"
                component="span"
              >
                <LocationOnIcon />
              </IconButton>
            </td>
            <td>
              <Typography variant="body1">{address.address_line_1}</Typography>
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <Typography variant="body1">
                {address.postal_code} {address.locality}{" "}
                {address.administrative_district_level_1}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <IconButton
                color="secondary"
                aria-label="show location"
                component="span"
                onClick={() => {
                  window.open("tel:" + location.phone_number, "_blank");
                }}
              >
                <PhoneIcon />
              </IconButton>
            </td>
            <td>
              <Typography variant="body2" color="text.secondary">
                {location.phone_number}
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const formatTime = (time: string) => {
    return time;
  };

  const openingHours = (periods: Array<Period>) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Day of week</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => {
            return (
              <tr key={period.day_of_week}>
                <td>{period.day_of_week} </td>
                <td>
                  {" "}
                  {formatTime(period.start_local_time)} -{" "}
                  {formatTime(period.end_local_time)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const locations = (
    <>
      <Grid item xs={12} md={6}>
        <Card style={{ margin: "10px" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {location.business_name}
            </Typography>
            {formatContact(location.address)}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ margin: "10px" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Opening hours
            </Typography>
            {openingHours(location.business_hours.periods)}
          </CardContent>
        </Card>
      </Grid>
    </>
    /* <LocationTeamMembers
          searchTeamMembers={sendRequest}
          members={members}
          selectedMemberId={selectedMemberId}
          setSelectedMemberId={setSelectedMemberId}
          /> */
  );
  return locations;
};

SquareLocation.defaultProps = {
  locations: [
    {
      id: "LEZRZFP3HD2V8",
      name: "Default Test Account",
      address: {
        address_line_1: "1600 Pennsylvania Ave NW",
        locality: "Washington",
        administrative_district_level_1: "DC",
        postal_code: "20500",
        country: "US",
      },
      timezone: "Pacific/Pago_Pago",
      capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
      status: "ACTIVE",
      created_at: "2022-06-03T04:27:57.640Z",
      merchant_id: "MLSNZ59TJ2THN",
      country: "US",
      language_code: "en-US",
      currency: "USD",
      phone_number: "+1 202-226-8000",
      business_name: "Default Test Account",
      type: "PHYSICAL",
      business_hours: {
        periods: [
          {
            day_of_week: "MON",
            start_local_time: "09:00:00",
            end_local_time: "17:00:00",
          },
          {
            day_of_week: "TUE",
            start_local_time: "09:00:00",
            end_local_time: "17:00:00",
          },
          {
            day_of_week: "WED",
            start_local_time: "09:00:00",
            end_local_time: "17:00:00",
          },
          {
            day_of_week: "THU",
            start_local_time: "09:00:00",
            end_local_time: "17:00:00",
          },
          {
            day_of_week: "FRI",
            start_local_time: "09:00:00",
            end_local_time: "17:00:00",
          },
        ],
      },
      business_email:
        "sandbox-merchant+xa4ulp3jls9bkxkmjqymeces3rpez3dr@squareup.com",
      mcc: "7299",
    },
  ],
};

export default SquareLocation;
