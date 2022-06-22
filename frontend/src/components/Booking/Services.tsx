import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { CatalogObject, Service, ServiceCategory } from "types/Catalog";
import ServiceLabel from "components/Booking/ServiceLabel";
import { formatCatalogObjects } from "utils/service";
import "./Services.css";

interface ServicesProps {
  catalogObjects: Array<CatalogObject>;
  selectedServices: Array<string>;
  setSelectedServices: (services: Array<string>) => void;
}

const Services = ({
  catalogObjects,
  selectedServices,
  setSelectedServices,
}: ServicesProps) => {
  const objects = formatCatalogObjects(catalogObjects);
  const mainServices = objects.filter((service) => {
    return service.category === ServiceCategory.MAIN;
  });
  const optionalServices = objects.filter(
    (service) => service.category === ServiceCategory.OPTIONAL
  );
  const serviceForms = (services: Array<Service>) => {
    return services.map((service, index) => (
      <ServiceLabel
        service={service}
        selectedServices={selectedServices}
        key={index}
      />
    ));
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    // @ts-ignore
    if (!event.target.checked) {
      setSelectedServices(
        selectedServices.filter((service) => service !== target.value)
      );
    } else {
      setSelectedServices([...selectedServices, target.value]);
    }
  };

  return (
    <FormControl>
      <FormGroup onChange={onChange}>
        {serviceForms(mainServices)}
        {serviceForms(optionalServices)}
      </FormGroup>
    </FormControl>
  );
};

export default Services;
