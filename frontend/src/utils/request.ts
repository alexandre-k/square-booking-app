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

// const isSquareError = (errorData: any): errorData is SquareError => {
//   if (
//     errorData &&
//     Array.isArray(errorData.errors) &&
//     errorData.errors.length > 1
//   ) {
//     const error = errorData.errors[0];
//     return (
//       "category" in error &&
//       "code" in error &&
//       "detail" in error &&
//       "field" in error
//     );
//   } else {
//     return false;
//   }
// };

// export const useAxios = (axiosParams: AxiosInterface) => {
//   const [data, setData] = useState(undefined);
//   const [error, setError] = useState("");
//   const [loaded, setLoaded] = useState(false);
//   const controllerRef = useRef(new AbortController());
//   const cancel = () => controllerRef.current.abort();

export const sendRequest = async (
  url: string,
  method: string,
  payload: object = {},
  jwt: string = ""
) => {
  try {
    // const formData = new FormData();
    // for (let key of Object.keys(params.payload)) {
    //   //@ts-ignore
    //   formData.append(key, params.payload[key]);
    // }
    // const response = await axios.request({
    //   url: params.url,
    //   // signal: controllerRef.current.signal,
    //   method: params.method,
    //   headers,
    //   data: JSON.stringify(params.payload),
    // });
    const authHeaders = !!jwt
      ? { ...headers, Authorization: `Bearer ${jwt}` }
      : headers;
    const response = await axios.request({
      url: process.env.REACT_APP_API_ENDPOINT + url,
      method,
      //@ts-ignore
      data: payload,
      headers: authHeaders,
    });
    return response.data;
  } catch (err: any) {
    throw err;
    // if (axios.isAxiosError(err)) {
    //     throw err;
    //   }
    //   const errorData = err?.response?.data;
    //   if (isSquareError(errorData)) {
    //     errorData.errors.forEach((error) => {
    //       console.error(
    //         "Error at field: ",
    //         error.field,
    //         " detail: ",
    //         error.detail
    //       );
    //       console.debug(error.detail);
    //       console.log(error);
    //       return null;
    //     });
    //   } else {
    //     console.log(err);
    //     return null;
    //   }
    //   // setError(err);
    //   return null;
    // } finally {
    // setLoaded(true);
  }
};

//   useEffect(() => {
//       sendRequest(axiosParams);
//   });

//   return [data, error, loaded, cancel];
// };

// export default useAxios;
