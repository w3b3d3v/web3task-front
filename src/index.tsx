import { Suspense } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import React from "react";
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  publicClient,
  webSocketPublicClient,
})

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
