import React, { useState } from "react";
import { Accordion } from "flowbite-react";
import { Tooltip } from "flowbite-react";
import { Modal } from "flowbite-react";

import { usePageContext } from "vike-react/usePageContext";
import { useData } from "vike-react/useData";

import type { Data } from "./+data.js";

import AlphaAlert from "../../components/AlphaAlert.jsx";
import SwitchAccountModal from "../../components/SwitchAccountModal.jsx";

export default function Page({ children }: { children: React.ReactNode }) {
    const pageContext = usePageContext();
    const data = useData<Data>();
    const [openModal, setOpenModal] = useState(false);

    // TODO: For now not actually logging out, just forcing to go to login prompt
    function handleLogIn(forceLogin: boolean) {
        // TODO: Nonce
        window.location.href = `oidc/auth?client_id=hashauth&response_type=none&redirect_uri=${pageContext.isDevelopment ? "http://localhost" : "https://hashauth.io"}&scope=openid&nonce=foobar&response_mode=fragment${forceLogin ? "&prompt=login" : ""}`;
    }

    function handleManageProfile() {
        window.location.href = "account";
    }

    function onDemoSSO() {
        window.location.href = `oidc/auth?client_id=hello-future-demo&response_type=id_token&redirect_uri=${pageContext.isDevelopment ? "http://localhost" : "https://hashauth.io"}/demo/callback&scope=openid&nonce=foobar&response_mode=form_post`;
    }

    function onDemoKYC() {
        window.location.href = `oidc/auth?client_id=hello-future-demo&response_type=id_token&redirect_uri=${pageContext.isDevelopment ? "http://localhost" : "https://hashauth.io"}/demo/callback&scope=openid%20kyc&nonce=foobar&response_mode=form_post`;
    }

    function onCloseSwitchAccountModal() {
        setOpenModal(false);
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center h-screen w-screen max-w-7xl mx-auto px-1 md:px-10 xl:w-10/12">
                <div className="mx-auto w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <AlphaAlert></AlphaAlert>
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-0 pb-0">
                            HashAuth <span className="text-xs text-red-700">{pageContext.isTestnet ? "TESTNET" : ""}</span>
                            <div className="text-xs font-extralight mt-0 pt-1 text-center">
                                First-class authentication, KYC and user profiles for Hedera
                            </div>
                        </h1>
                    </div>
                    <SwitchAccountModal show={openModal} onClose={onCloseSwitchAccountModal}></SwitchAccountModal>
                    <div className="text-center pb-3 dark:text-white">
                        <div className="mb-10">
                            {pageContext.accountId ? (
                                <div>
                                    <div>
                                        Hello,
                                        <span className="font-bold"> {pageContext.accountId}</span>
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            onClick={() => handleManageProfile()}
                                            className=" mr-2 bg-blue-500 text-white font-extralight text-sm text-center rounded-lg py-1 px-5 rounded"
                                        >
                                            Manage Profile
                                        </button>

                                        <button
                                            onClick={() => setOpenModal(true)}
                                            className="bg-red-700 hover:bg-red-800 text-white font-extralight text-sm text-center rounded-lg py-1 px-5 rounded"
                                        >
                                            Switch Account
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleLogIn(false)}
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-10 rounded"
                                >
                                    <span className=" font-light text-center">Sign in</span>
                                </button>
                            )}
                            <hr className="mt-8" />
                        </div>
                        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                            <div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">
                                    Single Sign-On
                                    <div>
                                        <small className="font-extralight">via OpenID Connect</small>
                                    </div>
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400"></p>
                                <button
                                    onClick={() => onDemoSSO()}
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-10 rounded"
                                >
                                    <span className=" font-light text-center">Demo Single Sign On</span>
                                </button>
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">
                                    Know-Your-Customer Provider
                                    <div>
                                        <small className="font-extralight">via OAuth2</small>
                                    </div>
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400"></p>
                                <button
                                    onClick={() => onDemoKYC()}
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-10 rounded"
                                >
                                    <span className=" font-light text-center">Demo KYC OAuth</span>
                                </button>
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">
                                    Change-of-Ownership Protection
                                    <div>
                                        <small className="font-extralight">via OIDC back-channel logout</small>
                                    </div>
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
