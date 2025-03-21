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
      userPoolClientId: process.env.REACT_APP_POOL_CLIENT_ID,
      userPoolId: process.env.REACT_APP_USERPOOL_ID,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
