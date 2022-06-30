import { Capability } from "types/Location";
import { getCapability } from "./capability";

test('getCapability returns the correct payment capability accepted', () => {
    expect(getCapability(Capability.CREDIT_CARD_PROCESSING)).toBe("credit card");
    expect(getCapability(Capability.AUTOMATIC_TRANSFERS)).toBe("transfer");
});
