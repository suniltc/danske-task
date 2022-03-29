import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import AddCard from "./components/AddCard";
import EditCard from "./components/EditCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CardProvider } from "./context/CardContext";

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/add-new-card" element={<AddCard />} />
            <Route path="/edit-card/:id" element={<EditCard />} />
          </Routes>
        </BrowserRouter>
      </CardProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
