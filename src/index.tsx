import React from "react";
import App from "./App";
import { Suspense } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { WagmiConfig } from 'wagmi';
import { config } from './wagmi'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback="...is loading">
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </WagmiConfig>
  </React.StrictMode>
);
