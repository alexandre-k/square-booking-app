import React from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { CatalogObject, Service, ServiceCategory } from "types/Catalog";
import ServiceForm from "components/Booking/ServiceForm";
import { formatCatalogObjects } from "utils/service";
import { getCatalogObjects } from "api/services";
import Loading from "components/Loading";
import "./Services.css";

interface ServicesProps {
  selectedServices: Array<Service>;
  setSelectedServices: (services: Array<Service>) => void;
}

const Services = ({ selectedServices, setSelectedServices }: ServicesProps) => {
  const { isLoading, isError, data, error } = useQuery<
    Array<CatalogObject>,
    AxiosError
  >("catalogObjects", getCatalogObjects);

  if (!data || isLoading) return <Loading />;
  if (isError)
    return <div>Unable to get services! Do you have a Network problem?</div>;
  const objects = formatCatalogObjects(data);
  const mainServices = objects.filter((service) => {
    return service.category === ServiceCategory.MAIN;
  });
  const optionalServices = objects.filter(
    (service) => service.category === ServiceCategory.OPTIONAL
  );

  return (
    <FormControl>
      <FormGroup>
        <ServiceForm
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          services={mainServices}
          category={ServiceCategory.MAIN}
          categoryTitle="Main Services"
        />
        <ServiceForm
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          services={optionalServices}
          category={ServiceCategory.OPTIONAL}
          categoryTitle="Options"
        />
      </FormGroup>
    </FormControl>
  );
};

export default Services;
