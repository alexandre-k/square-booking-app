import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import "./Footer.css";

interface FooterProps {
  routes: Array<string>;
}
const Footer = ({ routes }: FooterProps) => {
  return (
    <Grid id="footer" xs={12} md={12}>
      <Divider />
      <div id="footer-content">
        Footer... work in progress
        {routes.map((route) => (
          <p>{route}</p>
        ))}
      </div>
    </Grid>
  );
};

export default Footer;
