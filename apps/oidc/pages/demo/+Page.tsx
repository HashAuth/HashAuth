import React from "react";
import * as jose from "jose";
import { usePageContext } from "vike-react/usePageContext";

export default function Page({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();

  let decodedJwt = jose.decodeJwt(pageContext.id_token);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div
              className="p-4 mb-4 text-sm text-center text-blue-800 rounded-lg bg-blue-50"
              role="alert"
            >
              HashAuth is currently in{" "}
              <span className="font-medium">ALPHA</span>.
            </div>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              HashAuth{" "}
              <span className="text-xs text-red-700">
                {pageContext.isTestnet ? "TESTNET" : ""}
              </span>
            </h1>

            <div className="overflow-scroll max-h-64">
              <h3>Decoded claims:</h3>
              <ul>
                {Object.keys(decodedJwt).map((key) => {
                  return <li key={key}>{`${key}: ${decodedJwt[key]}`}</li>;
                })}
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="text-sm font-light no-underline hover:underline text-gray-500 dark:text-gray-400 text-center">
                <a href="/">Back Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
