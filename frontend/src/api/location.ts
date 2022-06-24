import { sendRequest } from "utils/request";

export const getLocation = async () => {
  return await sendRequest("/location", "GET");
};
