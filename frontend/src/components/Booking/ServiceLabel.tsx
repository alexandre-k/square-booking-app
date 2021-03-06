import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Service } from "types/Catalog";
import { convertMsToMins } from "utils/dateTime";
import { getMoneyAsCurrency, hasServiceIncluded } from "utils/service";
import "./Services.css";

interface ServiceLabelProps {
  service: Service;
  selectedServices: Array<Service>;
  setSelectedServices: (services: Array<Service>) => void;
}

const ServiceLabel = ({
  service,
  selectedServices,
  setSelectedServices,
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
          {getMoneyAsCurrency(service.money)}
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
        hasServiceIncluded(selectedServices, service)
          ? selectedStyle
          : notSelectedStyle
      }
      onClick={() => {
        const newSelectedServices = hasServiceIncluded(
          selectedServices,
          service
        )
          ? selectedServices.filter((s) => s.id !== service.id)
          : [...selectedServices, service];
        setSelectedServices(newSelectedServices);
      }}
    >
      <CardContent key={service.id}>{label}</CardContent>
    </Card>
  );
};

export default ServiceLabel;
