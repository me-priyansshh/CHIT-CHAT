import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store.js"; // 👈 import persistor
import { PersistGate } from "redux-persist/integration/react";
import MyToaster from "../toaster.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <MyToaster />
      </PersistGate>
    </Provider>
);