import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import PaymentIcon from "@mui/icons-material/Payment";
import PhoneIcon from "@mui/icons-material/Phone";
import Typography from "@mui/material/Typography";
import { getCapability } from "utils/capability";
import { Address, Capability } from "types/Location";

interface ContactProps {
  address: Address;
  capabilities: Array<Capability>;
  phone_number: string;
  business_email: string;
}

const Contact = ({
  address,
  capabilities,
  phone_number,
  business_email,
}: ContactProps) => (
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
          <Typography variant="body1">{address.addressLine1}</Typography>
        </td>
      </tr>

      <tr>
        <td></td>
        <td>
          <Typography variant="body1">
            {address.postalCode} {address.locality}{" "}
            {address.administrativeDistrictLevel1}
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
              window.open("tel:" + phone_number, "_blank");
            }}
          >
            <PhoneIcon />
          </IconButton>
        </td>
        <td>
          <Typography variant="body2" color="text.secondary">
            {phone_number}
          </Typography>
        </td>
      </tr>
      <tr>
        <td>
          <IconButton
            color="secondary"
            aria-label="email"
            component="span"
            onClick={() => {
              window.open("mailto:" + business_email, "_blank");
            }}
          >
            <MailIcon />
          </IconButton>
        </td>
        <td>
          <Link
            href={`mailto:${business_email}`}
            target="_blank"
            underline="none"
            style={{ overflowWrap: "anywhere" }}
          >
            <Typography variant="body2">Send an email</Typography>
          </Link>
        </td>
      </tr>
      <tr>
        <td>
          <IconButton color="secondary" aria-label="payments" component="span">
            <PaymentIcon />
          </IconButton>
        </td>
        <td>
          <Typography variant="body2">
            Pay by {capabilities.map((capability, index) => {
              const divider = index < capabilities.length - 1 ? " / " : "";
              return getCapability(capability) + divider;
            })}
          </Typography>
        </td>
      </tr>
    </tbody>
  </table>
);

export default Contact;
