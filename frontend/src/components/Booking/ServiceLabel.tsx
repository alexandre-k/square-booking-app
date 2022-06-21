import React from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { Service } from "types/Catalog";
import "./Services.css";

type ServiceId = string;

interface ServiceLabelProps {
  service: Service;
  selectedServices: Array<ServiceId>;
}

const ServiceLabel = ({ service, selectedServices }: ServiceLabelProps) => {
  const label = (
    <div className="serviceLabel">
      <div>
        <Typography
          style={{ fontWeight: "bold" }}
          variant="body1"
          color="inherit"
          component="div"
        >
          {service.name}
        </Typography>
      </div>
      <div>
        <Typography
          style={{ color: "grey" }}
          variant="body1"
          color="inherit"
          component="div"
        >
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: service.currency,
          }).format(service.price)}
        </Typography>
      </div>
      <div>
        <Typography
          style={{ color: "grey" }}
          variant="body2"
          color="inherit"
          component="div"
        >
          {Math.floor(service.duration / 60 / 60 / 60)} min.
        </Typography>
      </div>
    </div>
  );
  const selectedStyle = {
    backgroundColor: "#bfe2e2",
    border: "1px solid #bfe2e2",
  };
  const notSelectedStyle = {
    backgroundColor: "#f0f7f7",
    borderColor: "1px solid #f0f7f7",
  };
  return (
    <Card
      className="serviceCard"
      style={
        selectedServices.includes(service.id) ? selectedStyle : notSelectedStyle
      }
    >
      <FormControlLabel
        key={service.id}
        value={service.id}
        control={<Checkbox />}
        label={label}
      />
    </Card>
  );
};

export default ServiceLabel;
