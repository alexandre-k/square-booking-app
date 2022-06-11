import axios from "axios";

const token = process.env.REACT_APP_SQUARE_ACCESS_TOKEN;

type SquareAPIRequestHeader = {
  Authorization: string;
  "Square-Version": string;
  Accept: string;
  "Content-Type": string;
};

const headers: SquareAPIRequestHeader = {
  Authorization: `Bearer ${token}`,
  "Square-Version": process.env.REACT_APP_SQUARE_API_VERSION
    ? process.env.REACT_APP_SQUARE_API_VERSION
    : "",
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

const isSquareError = (errorData: any): errorData is SquareError => {
  if (Array.isArray(errorData.errors) && errorData.errors.length > 1) {
    const error = errorData.errors[0];
    return (
      "category" in error &&
      "code" in error &&
      "detail" in error &&
      "field" in error
    );
  } else {
    return false;
  }
};

// export const useAxios = (axiosParams: AxiosInterface) => {
//   const [data, setData] = useState(undefined);
//   const [error, setError] = useState("");
//   const [loaded, setLoaded] = useState(false);
//   const controllerRef = useRef(new AbortController());
//   const cancel = () => controllerRef.current.abort();

export const sendRequest = async (params: AxiosInterface) => {
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
    const response = await axios.request({
      url: params.url,
      method: params.method,
      //@ts-ignore
      data: params.payload,
      headers,
    });
    return response.data;
    // setData(response.data);
  } catch (err: any) {
    const errorData = err?.response?.data;
    if (isSquareError(errorData)) {
      errorData.errors.forEach((error) => {
        console.error(
          "Error at field: ",
          error.field,
          " detail: ",
          error.detail
        );
        console.debug(error.detail);
        console.log(error);
      });
    } else {
      console.log(err);
    }
    // setError(err);
      return null;
  } finally {
    // setLoaded(true);
  }
};

//   useEffect(() => {
//       sendRequest(axiosParams);
//   });

//   return [data, error, loaded, cancel];
// };

// export default useAxios;
