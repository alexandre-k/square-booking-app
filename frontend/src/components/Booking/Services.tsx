import React from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CatalogObject, Service, ServiceCategory } from "types/Catalog";
import ServiceLabel from "components/Booking/ServiceLabel";
import { formatCatalogObjects } from "utils/service";
import { getCatalogObjects } from "api/services";
import Loading from "components/Loading";
import "./Services.css";

interface ServicesProps {
  selectedServices: Array<string>;
  setSelectedServices: (services: Array<string>) => void;
}

const Services = ({ selectedServices, setSelectedServices }: ServicesProps) => {
  const { isLoading, isError, data, error } = useQuery<Array<CatalogObject>, AxiosError>(
    "catalogObjects",
    getCatalogObjects
  );

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
  const serviceForms = (
    services: Array<Service>,
    category: ServiceCategory,
    categoryTitle: string
  ) => {
    if (services.length === 0 && category === ServiceCategory.MAIN) {
      return (
        <Typography variant="h6" component="div">
          No service found! It is likely that there was a network error or no
          service available.
        </Typography>
      );
    } else if (services.length === 0) {
      return <></>;
    } else {
      return (
        <>
          <Typography variant="h4" component="div">
            {categoryTitle}
          </Typography>
          <Divider />
          <Grid container>
            {services.map((service, index) => (
              <Grid key={index} item xs={11} md={6}>
                <ServiceLabel
                  service={service}
                  selectedServices={selectedServices}
                  key={index}
                />
              </Grid>
            ))}
          </Grid>
        </>
      );
    }
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
        {serviceForms(mainServices, ServiceCategory.MAIN, "Main Services")}
        {serviceForms(optionalServices, ServiceCategory.OPTIONAL, "Options")}
      </FormGroup>
    </FormControl>
  );
};

export default Services;
