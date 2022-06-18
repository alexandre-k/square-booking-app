import { Capability } from "types/Location";

export const getCapability = (capability: Capability) => {
    if (capability === Capability.AUTOMATIC_TRANSFERS)
        return "transfer";
    return "credit card";
}
