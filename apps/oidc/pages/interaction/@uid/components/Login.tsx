import React, { useEffect, useRef, useState } from "react";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
import {
    HederaSessionEvent,
    HederaJsonRpcMethod,
    DAppConnector,
    HederaChainId,
    SignMessageParams,
    base64StringToSignatureMap,
    DAppSigner,
} from "@hashgraph/hedera-wallet-connect";

import type { Data } from "../+data";
import { AccountId, LedgerId } from "@hashgraph/sdk";
import { SessionTypes } from "@walletconnect/types";

const appMetadata = {
    name: "HashAuth",
    description: "SSO and KYC provider for Hedera",
    icons: ["<Image url>"],
    url: "https://hashauth.io",
};

let dAppConnector: DAppConnector | null;
let selectedWallet: string | null;
let selectedSigner: DAppSigner | null;

export default function Login() {
    const data = useData<Data>();
    const context = usePageContext();
    const loginFormRef = useRef<HTMLFormElement>(null);
    const accountIdRef = useRef<HTMLInputElement>(null);
    const authTokenSignatureRef = useRef<HTMLInputElement>(null);

    function handleNewSession(session: SessionTypes.Struct) {
        const sessionAccount = session.namespaces?.hedera?.accounts?.[0];
        const sessionParts = sessionAccount?.split(":");
        const accountId = sessionParts.pop();
        const network = sessionParts.pop();

        if (!accountId || network !== (context.isTestnet ? "testnet" : "mainnet") || session.expiry * 1000 < Date.now()) {
            disconnectWallet();
        } else {
            selectedWallet = accountId.toString();
            selectedSigner = dAppConnector!.getSigner(AccountId.fromString(accountId));
            console.log(`Wallet ${selectedWallet} Signer ${selectedSigner} ${accountId.toString()}`);
        }
    }

    async function disconnectWallet() {
        try {
            await dAppConnector!.disconnectAll();
        } catch {
            return;
        }
        selectedWallet = null;
        selectedSigner = null;
    }

    useEffect(() => {
        const initializeWalletConnect = async () => {
            let retries = 0;
            do {
                dAppConnector = new DAppConnector(
                    appMetadata,
                    context.isTestnet ? LedgerId.TESTNET : LedgerId.MAINNET,
                    context.isTestnet ? "4734ce0a8b9026dd51d99a281123881b" : "a442f3b912050e178966eacb3a8ecf85",
                    Object.values(HederaJsonRpcMethod),
                    [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
                    [context.isTestnet ? HederaChainId.Testnet : HederaChainId.Mainnet],
                );
                await new Promise((resolve) => setTimeout(resolve, 150));
                retries++;
            } while (dAppConnector.extensions.length === 0 && retries < 5);
            await dAppConnector.init({ logger: "error" });

            dAppConnector!.walletConnectClient!.removeAllListeners("session_delete");
            dAppConnector!.walletConnectClient!.removeAllListeners("session_expire");
            dAppConnector!.walletConnectClient!.removeAllListeners("session_proposal");

            // TODO: As a future QOL update, allow users to choose from list of already connected accounts
            await disconnectWallet();

            dAppConnector.onSessionIframeCreated = (session: SessionTypes.Struct) => {
                handleNewSession(session);
                console.log("new session detected");
            };

            dAppConnector!.walletConnectClient!.on("session_proposal", (event) => {
                console.log("proposal activated");
            });

            dAppConnector!.walletConnectClient!.on("session_expire", (event) => {
                disconnectWallet();
                console.log("session expired");
            });

            dAppConnector!.walletConnectClient!.on("session_delete", (event) => {
                disconnectWallet();
                console.log("session deleted");
            });

            const sessions = dAppConnector.walletConnectClient?.session.getAll();
            if (sessions && sessions.length > 0) {
                if (sessions.length > 1) {
                    disconnectWallet();
                } else {
                    handleNewSession(sessions[0]);
                }
            }
        };
        initializeWalletConnect();
    }, []);

    async function handleAuthWithMetaMask(event: any) {
        event.preventDefault();
    }

    async function pairWallet() {
        // TODO: This should probably be state. Also, we don't currently have a loading screen (can easily add one), so if user clicks button too fast will have to click agian.
        if (dAppConnector) {
            try {
                let session;
                if (dAppConnector.extensions[0]?.name === "HashPack") {
                    session = await dAppConnector.connectExtension(dAppConnector.extensions![0].id);
                } else {
                    session = await dAppConnector.openModal();
                }
                handleNewSession(session);
            } catch {
                return;
            }
        }
    }

    async function authenticateWallet() {
        if (dAppConnector && selectedWallet && selectedSigner) {
            let signature;

            if (!data || !data.authToken) {
                alert("Something went wrong on our end. Please try refreshing.");
                return;
            }

            const signParams: SignMessageParams = {
                signerAccountId: `hedera:${context.isTestnet ? "testnet" : "mainnet"}:${selectedWallet}`,
                message: data.authToken,
            };

            try {
                let result = await dAppConnector.signMessage(signParams);
                let finishedResult = (result as unknown as { signatureMap: string }).signatureMap;
                const signatureMap = base64StringToSignatureMap(finishedResult);
                signature = signatureMap.sigPair[0].ed25519;
                if (!signature) signature = signatureMap.sigPair[0].ECDSASecp256k1;
            } catch (error) {
                alert("Something went wrong while authenticating. Please refresh and try again.");
                return;
            }

            if (!signature) {
                alert("Something went wrong on our end. Please try refreshing.");
                return;
            }

            if (accountIdRef.current && authTokenSignatureRef.current) {
                accountIdRef.current.value = selectedWallet;
                // TODO: Need to make sure we're unpacking this correctly in backend
                authTokenSignatureRef.current.value = signature.toString();
            } else {
                alert("Something went wrong on our end. Please try refreshing.");
                return;
            }

            return signature;
        } else {
            await pairWallet();
            return authenticateWallet();
        }
    }

    async function handleAuthWithHashPack(event: any) {
        event.preventDefault();
        // TODO: As a future QOL update, allow users to choose from list of already connected accounts
        await disconnectWallet();
        const signature = await authenticateWallet();
        if (signature) {
            loginFormRef.current?.submit();
        }
    }

    return (
        <div className="text-center">
            <form ref={loginFormRef} autoComplete="false" action={"/interaction/" + data?.interaction?.uid + "/login"} method="post">
                <input hidden ref={accountIdRef} readOnly type="text" name="accountId"></input>
                <input readOnly hidden type="text" name="authTokenSignature" ref={authTokenSignatureRef}></input>
                <input readOnly hidden type="text" name="authToken" value={data?.authToken}></input>
                <button
                    type="submit"
                    onClick={handleAuthWithHashPack}
                    className="w-10/12 bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-4 rounded"
                >
                    <span className="text-xs font-light text-center">Authenticate with</span>
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
                    <span className="text-xs font-light text-center">Authenticate with</span>
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
