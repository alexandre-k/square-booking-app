import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Jumbotron from "./Jumbotron";
import SquareLocation from "./SquareLocation";
import { Location } from "types/Location";

interface HomeProps {
  location: Location;
}

const Home = ({ location }: HomeProps) => {
  const { isAuthenticated } = useAuth0();

  console.log("TODO: Properly handle undefined location");
  const loginButton = isAuthenticated ? (
    <Link to="logout">
      <Button>Logout</Button>
    </Link>
  ) : (
    <Link to="login">
      <Button>Login</Button>
    </Link>
  );
  return (
    <CssBaseline enableColorScheme>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item xs={12}>
          {loginButton}
        </Grid>
        <Jumbotron location={location} />
        <SquareLocation location={location} />
      </Grid>
    </CssBaseline>
  );
};

export default Home;
