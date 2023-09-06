import { Suspense } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import React from "react";


const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback="...is loading">
          <App />  
        </Suspense>       
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
