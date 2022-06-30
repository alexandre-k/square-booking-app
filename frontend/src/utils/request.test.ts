import { sendRequest } from "./request";
import axios from "axios";

jest.mock("axios");

test("a request of the correct type should be sent", () => {
    axios.request.mockImplementation(() => Promise.resolve( { response: { data: [] } }))
    const response = sendRequest("GET", "/hello")
    expect(response).toMatchObject({});
})
