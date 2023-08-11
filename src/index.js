import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./App";


import { StateProvider } from "./redux/StateProvider";
import { initialState } from "./redux/initialState";
import reducer from "./redux/reducer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
        theme="light"
      />
      <App />
    </StateProvider>
  </React.StrictMode>
);
