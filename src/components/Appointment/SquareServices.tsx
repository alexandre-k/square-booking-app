import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { CatalogObject, CatalogObjectType } from "types/Catalog";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  currency: string;
};

interface SquareServicesProps {
  catalogObjects: Array<CatalogObject>;
  selectedServices: Array<string>;
  setSelectedServices: (services: Array<string>) => void;
  sendRequest: () => Promise<void>;
}

const SquareServices = (props: SquareServicesProps) => {
  const formatCatalogObjects = (catalogObjects: Array<CatalogObject>) => {
    return catalogObjects
      .filter((obj) => obj.type === CatalogObjectType.ITEM)
      .map((obj: CatalogObject) => {
        const variations = obj?.item_data?.variations;
        const hasVariations =
          variations !== undefined && obj.item_data.variations.length > 0;
        let duration = 3600000;
        let price = -1;
        let currency = "USD";
        let id = "";
        if (hasVariations && variations[0].item_variation_data) {
          duration = variations[0].item_variation_data.service_duration;
          id = variations[0].id;
          if (
            variations[0].item_variation_data.pricing_type ===
            "VARIABLE_PRICING"
          ) {
            price = -1;
            currency = "";
          } else {
            price = variations[0].item_variation_data?.price_money?.amount;
            currency = variations[0].item_variation_data?.price_money?.currency;
          }
        }
        return {
          id,
          name: obj?.item_data?.name,
          price,
          currency,
          duration,
        } as Service;
      });
  };

  const serviceForms = (services: Array<Service>) => {
    return services.map((service, index) => {
      const label = (
        <div key={index}>
          <Typography
            align="left"
            style={{ fontWeight: "bold" }}
            variant="body1"
            color="inherit"
            component="div"
          >
            {service.name} {service.price} {service.currency}
          </Typography>
          <Typography
            align="left"
            variant="body2"
            color="inherit"
            component="div"
          >
            {Math.floor(service.duration / 60 / 60 / 60)} min.
          </Typography>
        </div>
      );
      return (
        <FormControlLabel
          key={service.id}
          value={service.id}
          control={<Radio />}
          label={label}
          labelPlacement="end"
        />
      );
    });
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    props.setSelectedServices([target.value]);
  };
  return (
    <>
      <div style={{ margin: 15, display: "flex" }}>
        <Typography variant="h4" color="inherit" component="div">
          Select a service
        </Typography>
      </div>
      <FormControl>
        <RadioGroup
          aria-labelledby="service-group-label"
          name="service-buttons-group"
          onChange={onChange}
        >
          {serviceForms(formatCatalogObjects(props.catalogObjects))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

SquareServices.defaultProps = {
  sendRequest: () => console.log("Not implemented!"),
  selectedServices: [],
  setSelectedServices: () => console.log("Not implemented!"),
  catalogObjects: [],
};

export default SquareServices;
