import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { CatalogObject, CatalogObjectType } from "types/Catalog";
import "./SquareServices.css";

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
}

const SquareServices = (props: SquareServicesProps) => {
  const formatCatalogObjects = (catalogObjects: Array<CatalogObject>) => {
    return catalogObjects
      .filter((obj) => obj.type === CatalogObjectType.ITEM)
      .map((obj: CatalogObject) => {
        const variations = obj?.itemData?.variations;
        const hasVariations =
          variations !== undefined && obj.itemData.variations.length > 0;
        let duration = 3600000;
        let price = -1;
        let currency = "USD";
        let id = "";
        if (hasVariations && variations[0].itemVariationData) {
          duration = variations[0].itemVariationData.serviceDuration;
          id = variations[0].id;
          if (
            variations[0].itemVariationData.pricingType === "VARIABLE_PRICING"
          ) {
            price = -1;
            currency = "";
          } else {
            price = variations[0].itemVariationData?.priceMoney?.amount;
            currency = variations[0].itemVariationData?.priceMoney?.currency;
          }
        }
        return {
          id,
          name: obj?.itemData?.name,
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
          control={<Checkbox />}
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
    <div id="serviceContainer">
      {/* <div style={{ margin: 15, display: "flex" }}>
            <Typography variant="h4" color="inherit" component="div">
            Select a service
            </Typography>
            </div> */}
      <FormControl>
        <FormGroup onChange={onChange}>
          {serviceForms(formatCatalogObjects(props.catalogObjects))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

SquareServices.defaultProps = {
  selectedServices: [],
  setSelectedServices: () => console.log("Not implemented!"),
  catalogObjects: [],
};

export default SquareServices;
