import { Location } from "types/Location";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import "./SquareLocation.css";
import Contact from "./Contact";
import OpeningHours from "./OpeningHours";

interface SquareLocationProps {
  location: Location;
}

const SquareLocation = ({ location }: SquareLocationProps) => {
  return (
    <Grid
      className="locationContainer"
      container
      direction="row"
    >
      <Grid className="cardContainer" item xs={12} md={6}>
        <Card>
          <CardHeader title={location.businessName} />
          <CardContent>
            <Contact
              address={location.address}
              capabilities={location.capabilities}
              phone_number={location.phoneNumber}
              business_email={location.businessEmail}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid className="cardContainer" item xs={12} md={6}>
        <Card>
          <CardHeader title="Opening hours" />
          <CardContent>
            <OpeningHours periods={location.businessHours.periods} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SquareLocation;
