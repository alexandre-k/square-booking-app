import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import SquareLocation from "./SquareLocation";
import { Location } from "types/Location";

interface HomeProps {
  location: Location | undefined;
}

const Home = (props: HomeProps) => {
  const { isAuthenticated } = useAuth0();
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
        <Grid item xs={12}>{loginButton}</Grid>
        <Grid item xs={12}>
          <div style={{ position: "relative" }}>
            <figure style={{ margin: 0 }}>
              <img
                width="100%"
                height="100%"
                alt="hair_style_woman_picture"
                src="https://unsplash.com/photos/HEde-a_T4E8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8c3R5bGlzdHxlbnwwfHx8fDE2NTQ1Mjc5NzU&force=true&w=2400"
              />
              <figcaption className="figureCaption">
                <Typography variant="caption" display="block" gutterBottom>
                  Photo by{" "}
                  <a href="https://unsplash.com/@awcreativeut?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                    Adam Winger
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/photos/HEde-a_T4E8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">
                    Unsplash
                  </a>
                </Typography>
              </figcaption>
            </figure>
            {props.location === undefined ? (
              <div className="businessNameCard">
                <Typography color="white" variant="h2">
                  Loading...
                </Typography>
              </div>
            ) : (
              <div className="businessNameCard">
                <Typography color="white" variant="h2">
                  {props.location.business_name}
                </Typography>
                <Link to="book" style={{ textDecoration: "none" }}>
                  <Button
                    className="businessNameButton"
                    variant="contained"
                    size="large"
                    endIcon={<MoreTimeIcon />}
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Grid>
        <SquareLocation />
      </Grid>
    </CssBaseline>
  );
};

export default Home;
