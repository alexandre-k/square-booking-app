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
      container
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      rowSpacing={5}
      columnSpacing={3}
    >
      <Grid item xs={10} md={6}>
        <Card className="card">
          <CardHeader title={location.business_name} />
          <CardContent>
            <Contact
              address={location.address}
              capabilities={location.capabilities}
              phone_number={location.phone_number}
              business_email={location.business_email}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} md={6}>
        <Card className="card">
          <CardHeader title="Opening hours" />
          <CardContent>
            <OpeningHours periods={location.business_hours.periods}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
  /* <LocationTeamMembers
          searchTeamMembers={sendRequest}
          members={members}
          selectedMemberId={selectedMemberId}
          setSelectedMemberId={setSelectedMemberId}
          /> */
};

export default SquareLocation;
