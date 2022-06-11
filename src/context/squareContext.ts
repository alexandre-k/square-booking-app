import { createContext } from "react";

const SquareProvider = createContext(null);
// const token = process.env.REACT_APP_SQUARE_ACCESS_TOKEN;
// const headers = {
//   Authorization: `Bearer ${token}`,
//   "Square-Version": process.env.REACT_SQUARE_API_VERSION
//   "Content-Type": "application/json",
// };

// const SquareProvider = ({ applicationId, locationId, baseURL }) => {
//   return <Square.Provider value={{}}>{children}</Square.Provider>;
// };

export default SquareProvider;
