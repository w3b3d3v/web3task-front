import { FC, useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  isPhantom: boolean;
}

type WindowWithSolana = Window & {
  solana?: PhantomProvider;
};

const ConnectWalletSolana: FC = () => {
  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState<PublicKey | null>(null);
  const solWindow = window as WindowWithSolana;

  const ButtonStyles = {
    border: 0,
    backgroundColor: "transparent",
    color: "#fff",
    marginLeft: "-8px",
  };

  useEffect(() => {
    if ("solana" in window) {
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
      }
    }
  }, []);

  useEffect(() => {
    provider?.on("connect", (publicKey: PublicKey) => {
      console.log(`connect event: ${publicKey}`);
      setConnected(true);
      setPubKey(publicKey);
    });
    provider?.on("disconnect", () => {
      console.log("disconnect event");
      setConnected(false);
      setPubKey(null);
    });
  }, [provider]);

  const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    console.log(`connect handler`);
    provider?.connect().catch((err) => {
      console.error("connect ERROR:", err);
    });
  };

  const redirecToPhantom: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    console.log(`redirect to phantom`);
    if (!solWindow?.solana?.isPhantom) {
      window.location.href = "https://phantom.app/";
      return;
    }
    provider?.connect().catch((err) => {
      console.error("connect ERROR:", err);
    });
  };

  const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    console.log("disconnect handler");
    provider?.disconnect().catch((err) => {
      console.error("disconnect ERROR:", err);
    });
  };

  return (
    <>
      {walletAvail ? (
        <>
          <button
            disabled={connected}
            onClick={connectHandler}
            style={ButtonStyles}
          >
          {connected ? 'Connected' : 'Phantom'}
          </button>
          
        </>
      ) : (
        <>
          <button
            disabled={connected}
            onClick={redirecToPhantom}
            style={ButtonStyles}
          >
            Phantom
          </button>
        </>
      )}
    </>
  );
};

export default ConnectWalletSolana;
