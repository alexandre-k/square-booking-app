// import { useAxios } from "./useAxios";

// const addOrUpdateCustomer = (customer: Customer) => {
//     if (customer.id === undefined) {
//         axios
//             .post("/customers", {
//                 headers,
//             })
//             .then(({ data, status }) => {
//                 const firstCustomer = data.customers[0];
//                 setCustomer(firstCustomer);
//             })
//             .catch(setError)
//             .finally(() => setLoaded(true));
//     } else {
//         axios
//             .put("/customers", {
//                 headers,
//             })
//             .then(({ data }) => {
//                 const me = data.customers[0];
//                 setCustomer(me);
//             })
//             .catch(setError)
//             .finally(() => setLoaded(true));
//     }
// };


export interface Address {
  address_line_1: string;
  address_line_2: string;
  locality: string;
  administrative_district_level_1: string;
  postal_code: string;
  country: string;
}

export interface Preferences {
  email_unsubscribed: boolean;
}

export interface Customer {
  id?: string;
  created_at?: string;
  updated_at?: string;
  given_name: string;
  family_name: string;
  email_address: string;
  address?: Address;
  phone_number?: string;
  reference_id?: string;
  note?: string;
  preferences?: Preferences;
  creation_source?: string;
  version?: number;
}

// @ts-ignore
const useAxios = ({ url, method, payload }) => console.log('TODO: implement')

export const useSquareCustomer = (defaultCustomer?: Customer) => {
	// @ts-ignore
    const [customer, error, loaded, cancel ] = useAxios({
    url: "/customers?limit=1",
    method: "GET",
    payload: {},
  });

  return [customer, error, loaded, cancel];
};

export default useSquareCustomer;
