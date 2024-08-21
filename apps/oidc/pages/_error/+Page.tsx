// /pages/_error/+Page.ts

export { Page };

import { usePageContext } from "vike-react/usePageContext";
import React from "react";

function Page() {
  const pageContext = usePageContext();

  let msg: string; // Message shown to the user
  const { abortReason, abortStatusCode } = pageContext;
  if (abortReason?.notAdmin) {
    // Handle `throw render(403, { notAdmin: true })`
    msg = "You cannot access this page because you aren't an administrator.";
  } else if (typeof abortReason === "string") {
    // Handle `throw render(abortStatusCode, `You cannot access ${someCustomMessage}`)`
    msg = abortReason;
  } else if (abortStatusCode === 403) {
    // Handle `throw render(403)`
    msg =
      "You cannot access this page because you don't have enough privileges.";
  } else if (abortStatusCode === 401) {
    // Handle `throw render(401)`
    msg =
      "You cannot access this page because you aren't logged in. Please log in.";
  } else {
    // Fallback error message
    msg = pageContext.is404
      ? "This page doesn't exist."
      : "Something went wrong. Sincere apologies. Try again (later).";
  }

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

            <div className="space-y-4 md:space-y-6">
              <div
                className="p-4 mb-4 text-sm text-center text-black rounded-lg bg-red-100"
                role="alert"
              >
                {msg}
              </div>

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

// When using TypeScript you can define the type of `abortReason`
declare global {
  namespace Vike {
    interface PageContext {
      abortReason?: string | { notAdmin: true };
    }
  }
}
