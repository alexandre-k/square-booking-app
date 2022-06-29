import { createContext } from "react";

const SquareProvider = createContext(null);

// const SquareProvider = ({ applicationId, locationId, baseURL }) => {
//   return <Square.Provider value={{}}>{children}</Square.Provider>;
// };

export default SquareProvider;
