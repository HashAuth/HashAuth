import React, { useState } from "react";
import { Accordion } from "flowbite-react";
import { Tooltip } from "flowbite-react";
import { Modal } from "flowbite-react";

import { usePageContext } from "vike-react/usePageContext";
import { useData } from "vike-react/useData";

import type { Data } from "./+data.js";

import AlphaAlert from "../../components/AlphaAlert.jsx";

export default function Page({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const data = useData<Data>();
  const [openModal, setOpenModal] = useState(false);

  // TODO: For now not actually logging out, just forcing to go to login prompt
  function handleLogIn(forceLogin: boolean) {
    // TODO: Nonce
    window.location.href = `oidc/auth?client_id=hashauth&response_type=none&redirect_uri=${pageContext.isDevelopment ? "http://localhost" : "https://hashauth.io"}&scope=openid&nonce=foobar&response_mode=fragment${forceLogin ? "&prompt=login" : ""}`;
  }

  function onDemoSSO() {
    window.location.href = `oidc/auth?client_id=hello-future-demo&response_type=id_token&redirect_uri=${pageContext.isDevelopment ? "http://localhost" : "https://hashauth.io"}/demo/callback&scope=openid&nonce=foobar&response_mode=form_post`;
  }

  function onDemoKYC() {
    window.location.href = `oidc/auth?client_id=hello-future-demo&response_type=id_token&redirect_uri=${pageContext.isDevelopment ? "http://localhost" : "https://hashauth.io"}/demo/callback&scope=openid%20kyc&nonce=foobar&response_mode=form_post`;
  }

  return (
    <section className="h-full pb-1 md:pt-5 w-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-screen mx-auto px-1 md:px-10 xl:w-10/12">
        <div className="mx-auto w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <AlphaAlert></AlphaAlert>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-0 pb-0">
              HashAuth{" "}
              <span className="text-xs text-red-700">
                {pageContext.isTestnet ? "TESTNET" : ""}
              </span>
              <div className="text-xs font-extralight mt-0 pt-1 text-center">
                Hello Future Demo
              </div>
            </h1>
          </div>
          <div className="text-center pb-3 dark:text-white">
            {pageContext.accountId ? (
              <div>
                <div>
                  Hello,
                  <span className="font-bold"> {pageContext.accountId}</span>
                </div>
                <div className="mt-2">
                  <button
                    disabled
                    title="Not yet supported"
                    onClick={() => setOpenModal(true)}
                    className="cursor-not-allowed opacity-50 disabled mr-2 bg-blue-500 text-white font-extralight text-sm text-center rounded-lg py-1 px-5 rounded"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => handleLogIn(true)}
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
                <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                  If only there was more time to add more information here...
                </p>
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
                      <small className="font-extralight">
                        via OpenID Connect
                      </small>
                    </div>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400"></p>
                  <button
                    onClick={() => onDemoSSO()}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-10 rounded"
                  >
                    <span className=" font-light text-center">
                      Demo Single Sign On
                    </span>
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
                    <span className=" font-light text-center">
                      Demo KYC OAuth
                    </span>
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
                      <small className="font-extralight">
                        via OIDC back-channel logout
                      </small>
                    </div>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-5 mx-auto w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <Accordion collapseAll={true}>
            <Accordion.Panel>
              <Accordion.Title>
                What problems does HashAuth solve?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out this guide to learn how to&nbsp;
                  <a
                    href="https://flowbite.com/docs/getting-started/introduction/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    get started&nbsp;
                  </a>
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                How does HashAuth handle security?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is first conceptualized and designed using the Figma
                  software so everything you see in the library has a design
                  equivalent in our Figma file.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out the
                  <a
                    href="https://flowbite.com/figma/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Figma design system
                  </a>
                  based on the utility classes from Tailwind CSS and components
                  from Flowbite.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>What is the long-term vision?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  The main difference is that the core components from Flowbite
                  are open source under the MIT license, whereas Tailwind UI is
                  a paid product. Another difference is that Flowbite relies on
                  smaller and standalone components, whereas Tailwind UI offers
                  sections of pages.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  However, we actually recommend using both Flowbite, Flowbite
                  Pro, and even Tailwind UI as there is no technical reason
                  stopping you from using the best of two worlds.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Learn more about these technologies:
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>
                    <a
                      href="https://flowbite.com/pro/"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Flowbite Pro
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindui.com/"
                      rel="nofollow"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Tailwind UI
                    </a>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <form action="#">
          <Modal.Body>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value="iPad Air Gen 5th Wi-Fi"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex. Apple iMac 27&ldquo;"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value="Google"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex. Apple"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  value="399"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$299"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected={true}>Electronics</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write a description..."
                >
                  Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7
                  processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory,
                  Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD
                  storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US
                </textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-extralight text-sm text-center rounded-lgpy-1 px-5 rounded"
              onClick={() => setOpenModal(false)}
            >
              I accept
            </button>
            <button
              className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-extralight text-sm text-center rounded-lgpy-1 px-5 rounded"
              color="gray"
              onClick={() => setOpenModal(false)}
            ></button>
            Decline
          </Modal.Footer>
        </form>
      </Modal>
    </section>
  );
}
