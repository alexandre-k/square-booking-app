import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { CatalogObject, Service, ServiceCategory } from "types/Catalog";
import ServiceLabel from "components/Booking/ServiceLabel";
import { formatCatalogObjects } from "utils/service";
import { sendRequest } from "utils/request";
import Loading from "components/Loading";
import "./Services.css";

interface ServicesProps {
  selectedServices: Array<string>;
  setSelectedServices: (services: Array<string>) => void;
}

const Services = ({ selectedServices, setSelectedServices }: ServicesProps) => {
  const [catalogObjects, setCatalogObjects] = useState<Array<CatalogObject>>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const getCatalogObjects = async () => {
    setLoading(true);
    const services = await sendRequest("/services/objects", "GET");
    setCatalogObjects(services);
    setLoading(false);
  };

  useEffect(() => {
    if (catalogObjects.length === 0) {
      getCatalogObjects();
    }
  }, [catalogObjects]);

  if (loading) return <Loading />;
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
