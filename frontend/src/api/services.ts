import { sendRequest } from "utils/request";
export const getCatalogObjects = async () => {
    return await sendRequest("/services/objects", "GET");
};

