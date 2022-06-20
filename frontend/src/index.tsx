import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";
// import SquareProvider from "./context/squareContext";

// const baseURL = "https://connect.squareupsandbox.com/v2";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /* <SquareProvider
        applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID}
        locationId={process.env.REACT_APP_SQUARE_LOCATION_ID}
        baseURL={baseURL}
        > */
  <Auth0Provider
    domain={process.env.REACT_APP_OAUTH_DOMAIN || "undefined"}
    clientId={process.env.REACT_APP_OAUTH_ID || "undefined"}
    redirectUri={process.env.REACT_APP_OAUTH_REDIRECT_URI || "undefined"}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
  /* </SquareProvider> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
