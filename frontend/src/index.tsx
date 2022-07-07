import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import MagicLoginProvider from "context/MagicLoginProvider";
import StoreLocationProvider from "context/LocationProvider";
import WebSocketProvider from "context/WebSocketProvider";
import { ReactQueryDevtools } from "react-query/devtools";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <MagicLoginProvider>
      <WebSocketProvider>
        <StoreLocationProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </StoreLocationProvider>
      </WebSocketProvider>
    </MagicLoginProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
