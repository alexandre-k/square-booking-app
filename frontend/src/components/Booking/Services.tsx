import React from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { CatalogObject, CatalogObjectType } from "types/Catalog";
import ServiceLabel from "components/Booking/ServiceLabel";
import "./Services.css";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  currency: string;
};

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
    console.log("event target checked", target.checked);

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
        {serviceForms(formatCatalogObjects(catalogObjects))}
      </FormGroup>
    </FormControl>
  );
};

export default Services;
