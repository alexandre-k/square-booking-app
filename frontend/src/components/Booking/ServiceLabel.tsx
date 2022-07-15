import React from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { Service } from "types/Catalog";
import { convertMsToMins } from "utils/dateTime";
import "./Services.css";

interface ServiceLabelProps {
  service: Service;
  selectedServiceIds: Array<string>;
  onClick: (event: React.FormEvent<HTMLInputElement>) => void;
}

const ServiceLabel = ({ onClick, service, selectedServiceIds }: ServiceLabelProps) => {
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
          {convertMsToMins(service.duration)} min.
        </Typography>
      </div>
    </div>
  );
  const selectedStyle = {
    backgroundColor: "#e3f6f5",
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
        selectedServiceIds.includes(service.id)
          ? selectedStyle
          : notSelectedStyle
      }
      onChange={onClick}
    >
      <FormControlLabel
        key={service.id}
        value={service.id}
        control={
          <Checkbox
            checked={selectedServiceIds.includes(service.id) ? true : false}
          />
        }
        label={label}
      />
    </Card>
  );
};

export default ServiceLabel;
