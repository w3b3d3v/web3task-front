import React from "react";
import App from "./App";
import { Suspense } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { WagmiConfig } from 'wagmi';
import { client } from './wagmi'

import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'

import allConnections from './connectors'

const connections: [Connector, Web3ReactHooks][] = allConnections.map(([connector, hooks]) => [connector, hooks])

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback="...is loading">
            <Web3ReactProvider connectors={connections}>
              <App />
            </Web3ReactProvider>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </WagmiConfig>
  </React.StrictMode>
);
