import { Location } from "types/Location";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface JumbotronProps {
    location: Location
}

const Jumbotron = ({ location }: JumbotronProps) => (
  <Grid item xs={12} md={12}>
    <div id="figureContainer">
        <Card square>
        <CardMedia
            component="img"
          id="image"
          alt="hair_style_woman_picture"
          src="https://unsplash.com/photos/HEde-a_T4E8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8c3R5bGlzdHxlbnwwfHx8fDE2NTQ1Mjc5NzU&force=true&w=2400"
        />
        {/* <figcaption id="figureCaption">
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
            </figcaption> */}
      </Card>
      <Card className="businessNameCard">
        <CardContent className="cardContent">
          <Typography color="white" variant="h4">
            {location.businessName}
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
        </CardContent>
      </Card>
    </div>
  </Grid>
);

export default Jumbotron;
