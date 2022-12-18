import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./components/AppContext";
import { Routes } from "./components/Routes";
import { HashRouter } from "react-router-dom";

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
