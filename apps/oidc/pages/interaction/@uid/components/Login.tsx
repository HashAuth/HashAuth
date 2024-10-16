import React, { useEffect, useRef, useState } from "react";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
import {
  HashConnect,
  HashConnectConnectionState,
  SessionData,
} from "hashconnect";

import type { Data } from "../+data";
import { AccountId, LedgerId } from "@hashgraph/sdk";

const appMetadata = {
  name: "HashAuth",
  description: "SSO and KYC provider for Hedera",
  icons: ["<Image url>"],
  url: "https://hashauth.io",
};

export default function Login() {
  const initialized = useRef(false);
  const data = useData<Data>();
  const context = usePageContext();
  const loginFormRef = useRef<HTMLFormElement>(null);
  const accountIdRef = useRef<HTMLInputElement>(null);
  const authTokenSignatureRef = useRef<HTMLInputElement>(null);

  const [pairingData, setPairingData] = useState<SessionData | null>(null);
  const [hashconnect, setHashconnect] = useState<HashConnect | null>(null);
  const [connectionStatus, setConnectionStatus] = useState(
    HashConnectConnectionState.Disconnected
  );

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      init();
    }
  }, []);

  const init = async () => {
    const hashconnect = new HashConnect(
      context.isTestnet ? LedgerId.TESTNET : LedgerId.MAINNET,
      context.isDevelopment
        ? "4734ce0a8b9026dd51d99a281123881b"
        : "a442f3b912050e178966eacb3a8ecf85",
      appMetadata,
      true
    );

    //register events
    hashconnect.pairingEvent.on((newPairing) => {
      setPairingData(newPairing);
    });

    hashconnect.disconnectionEvent.on((data) => {
      setPairingData(null);
    });

    hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
      setConnectionStatus(connectionStatus);
    });

    //initialize
    await hashconnect.init();
    setHashconnect(hashconnect);
  };

  async function handleAuthWithMetaMask(event: any) {
    event.preventDefault();
  }

  async function hashpackSignAuthMessage() {
    if (pairingData) {
      if (!data || !data.authToken) {
        alert("Something went wrong on our end. Please try refreshing.");
        return;
      }

      let signature = await hashconnect?.signMessages(
        AccountId.fromString(pairingData.accountIds[0]),
        data.authToken
      );

      if (!signature || !signature[0]) {
        alert("Something went wrong on our end. Please try refreshing.");
        return;
      }

      if (accountIdRef.current && authTokenSignatureRef.current) {
        accountIdRef.current.value = signature[0].accountId.toString();
        authTokenSignatureRef.current.value = signature[0].signature.toString();
      } else {
        alert("Something went wrong on our end. Please try refreshing.");
        return;
      }

      return signature;
    }
  }

  async function handleAuthWithHashPack(event: any) {
    event.preventDefault();
    if (pairingData) {
      let signature = await hashpackSignAuthMessage();
      if (signature) {
        await hashconnect?.disconnect();
        loginFormRef.current?.submit();
      } else {
        await hashconnect?.disconnect();
      }
    } else {
      hashconnect?.openPairingModal();
    }
  }

  return (
    <div className="text-center">
      <form
        ref={loginFormRef}
        autoComplete="false"
        action={"/interaction/" + data?.interaction?.uid + "/login"}
        method="post"
      >
        <input
          hidden
          ref={accountIdRef}
          readOnly
          type="text"
          name="accountId"
        ></input>
        <input
          readOnly
          hidden
          type="text"
          name="authTokenSignature"
          ref={authTokenSignatureRef}
        ></input>
        <input
          readOnly
          hidden
          type="text"
          name="authToken"
          value={data?.authToken}
        ></input>
        <button
          type="submit"
          onClick={handleAuthWithHashPack}
          className="w-10/12 bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-4 rounded"
        >
          <span className="text-xs font-light text-center">
            Authenticate with
          </span>
          <div className="items-center text-center justify-center" />
          <div className="justify-center flex items-center text-xl text-center font-semibold text-center">
            <img
              className="w-5 h-5 mr-1"
              src="https://cdn.prod.website-files.com/61ce2e4bcaa2660da2bb419e/62e14973c65367120073a891_app-icon.webp"
              alt="logo"
            />
            HashPack
          </div>
        </button>
        <button
          type="submit"
          disabled
          onClick={handleAuthWithMetaMask}
          className="opacity-50 cursor-not-allowed w-10/12 bg-blue-500 text-white text-center mt-1 rounded-lg font-bold py-1 px-4 rounded"
        >
          <span className="text-xs font-light text-center">
            Authenticate with
          </span>
          <div className="items-center text-center justify-center" />
          <div className="justify-center flex items-center text-xl text-center font-semibold text-center">
            <img
              className="w-7 h-7"
              src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/SVG_MetaMask_Icon_Color.svg"
              alt="logo"
            />
            MetaMask
          </div>
        </button>
      </form>
    </div>
  );
}
