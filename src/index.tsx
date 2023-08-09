import ReactDOM from "react-dom";
import React from 'react';
import { Suspense } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { SidebarProvider } from "./contexts/SidebarContext";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Suspense fallback="...is loading">
            <App />  
          </Suspense>          
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
