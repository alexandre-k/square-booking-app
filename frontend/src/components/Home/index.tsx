import * as React from "react";
import "./index.css";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Jumbotron from "./Jumbotron";
import Login from "./Login";
import SquareLocation from "./SquareLocation";
import { Location } from "types/Location";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface HomeProps {
  location: Location;
}

console.log("TODO: Create custom theme color");
const theme = createTheme({
  palette: {
    primary: {
      main: "#00A0E5",
    },
  },
});

const Home = ({ location }: HomeProps) => {
  return (
    <CssBaseline enableColorScheme>
        {/* <ThemeProvider theme={theme}> */}
        <Grid container alignItems="center" justifyContent="space-around">
          <Grid item xs={12}>
            <AppBar position="static">
              <Login />
            </AppBar>
          </Grid>
          <Jumbotron location={location} />
          <SquareLocation location={location} />
        </Grid>
        {/* </ThemeProvider> */}
    </CssBaseline>
  );
};

export default Home;
