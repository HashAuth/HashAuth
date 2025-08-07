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
        <section className="h-full pb-1 md:pt-5 w-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-screen mx-auto px-1 md:px-10 xl:w-10/12">
                <div className="mx-auto w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <AlphaAlert></AlphaAlert>
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-0 pb-0">
                            HashAuth <span className="text-xs text-red-700">{pageContext.isTestnet ? "TESTNET" : ""}</span>
                            <div className="text-xs font-extralight mt-0 pt-1 text-center">Hello Future Demo</div>
                        </h1>
                    </div>
                    <SwitchAccountModal show={openModal} onClose={onCloseSwitchAccountModal}></SwitchAccountModal>
                    <div className="text-center pb-3 dark:text-white">
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
                    </div>
                </div>
                <div className="mt-10 grid content-center grid-flow-col gap-10">
                    <div className="col-span-2 mx-auto w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                            <div className="max-w-screen-md mb-8 lg:mb-16">
                                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                                    First-class authentication, profiles and KYC for Hedera
                                </h2>
                             
                            </div>
                            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                                <div>
                                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg
                                            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
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
                                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg
                                            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                                        </svg>
                                    </div>
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
                                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg
                                            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                                        </svg>
                                    </div>
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
            </div>
        </section>
    );
}
