import axios from "axios";

type SquareAPIRequestHeader = {
  Accept: string;
  "Content-Type": string;
};

const headers: SquareAPIRequestHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export interface SquareError {
  errors: [
    {
      category: string;
      code: string;
      detail: string;
      field: string;
    }
  ];
}

export interface AxiosInterface {
  url: string;
  method: string;
  payload: object;
}

export const sendRequest = async (
  url: string,
  method: string,
  payload: object = {},
  jwt: string = ""
) => {
    const authHeaders = !!jwt
      ? { ...headers, Authorization: `Bearer ${jwt}` }
      : headers;
    console.log(process.env);
    const response = await axios.request({
      url: "/api" + url,
      method,
      //@ts-ignore
      data: payload,
      headers: authHeaders,
    });
    return response.data;
};
