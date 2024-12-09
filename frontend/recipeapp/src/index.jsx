import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import { BrowserRouter } from "react-router-dom";
import { InitializeDB } from "./utilities/storage/DataStorage";
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: import.meta.env.VITE_POOL_CLIENT_ID,
      userPoolId: import.meta.env.VITE_USERPOOL_ID,
    },
  },
});
await InitializeDB();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
