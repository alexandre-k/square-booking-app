import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { Service } from "types/Catalog";
import { convertMsToMins } from "utils/dateTime";
import "./Services.css";

interface ServiceLabelProps {
  service: Service;
  selectedServices: Array<string>;
  setSelectedServices: (services: Array<string>) => void;
}

const ServiceLabel = ({
  service,
  selectedServices,
  setSelectedServices
}: ServiceLabelProps) => {
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
        selectedServices.includes(service.id) ? selectedStyle : notSelectedStyle
      }
      onClick={() => {
        const selectedServiceId = service.id;
        const newSelectedServices = selectedServices.includes(selectedServiceId)
          ? selectedServices.filter(
              (serviceId: string) => serviceId !== selectedServiceId
            )
          : [...selectedServices, selectedServiceId];
        setSelectedServices(newSelectedServices);
      }}
    >
      <CardContent key={service.id}>{label}</CardContent>
    </Card>
  );
};

export default ServiceLabel;
