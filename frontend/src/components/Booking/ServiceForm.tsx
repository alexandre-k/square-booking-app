import { Service, ServiceCategory } from "types/Catalog";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ServiceLabel from "components/Booking/ServiceLabel";

interface ServiceFormProps {
  selectedServices: Array<Service>;
  setSelectedServices: (services: Array<Service>) => void;
  services: Array<Service>;
  category: ServiceCategory;
  categoryTitle: string;
}

const ServiceForm = ({
  selectedServices,
  setSelectedServices,
  services,
  category,
  categoryTitle,
}: ServiceFormProps) => {
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
            <Grid key={index} item xs={6} md={6}>
              <ServiceLabel
                service={service}
                selectedServices={selectedServices}
                key={index}
                setSelectedServices={setSelectedServices}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
};

export default ServiceForm;
