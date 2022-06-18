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
    <>
      <Grid item xs={10} md={5}>
        <Card className="card">
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
      <Grid item xs={10} md={5}>
        <Card className="card">
          <CardHeader title="Opening hours" />
          <CardContent>
            <OpeningHours periods={location.businessHours.periods}/>
          </CardContent>
        </Card>
      </Grid>
      </>
  );
};

export default SquareLocation;
