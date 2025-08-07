import React from "react";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";

import type { Data } from "../+data.js";

export default function Consent() {
  const data = useData<Data>();
  const pageContext = usePageContext();

  function handleDeny(event: any) {
    event.preventDefault();
    window.location.href = `/interaction/${data?.interaction?.uid}/abort`;
  }

  return (
    <div className="container prose dark:prose-invert">
      <div className="mb-5">
        <div className="text-center">
          {data?.interaction?.client?.logoUri ? (
            <img
              className="mr-auto ml-auto mt-0 pt-0 mb-2 pb-0"
              src={data?.interaction?.client?.logoUri}
              width="100"
            />
          ) : (
            ""
          )}
          <span className="font-medium">
            {data?.interaction?.client?.clientName}
          </span>{" "}
          would like to access your:
        </div>
        <ul>
          {data?.interaction?.details.missingOIDCScope.map((scope) => {
            switch (scope) {
              case "openid":
                return [
                  <li key="openid-accountid">
                    <span key="openid-accountid-span" className="font-medium">
                      Wallet address
                    </span>{" "}
                    ({pageContext.accountId})
                  </li>,
                  <li key="openid-nickname">
                    <span key="openid-nickname-span" className="font-medium">
                      Display name
                    </span>
                  </li>,
                ];
              case "kyc":
                return (
                  <li className="border rounded-md border-2 border-red-500 ">
                    <span key="kyc-span" className="font-medium">
                      KYC profile
                    </span>
                    , which includes your:
                    <ul key="kyc-ul" className="font-medium">
                      <li key="kyc-li-fullname">Full name</li>
                      <li key="kyc-li-dob">Date of birth</li>
                      <li key="kyc-li-address">Residential address</li>
                      <li key="kyc-li-id-info">Verified ID information</li>
                    </ul>
                  </li>
                );
            }
          })}
        </ul>
      </div>
      <div>
        <form
          autoComplete="false"
          action={"/interaction/" + data?.interaction?.uid + "/confirm"}
          method="post"
        >
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 mr-1 text-white text-center px-10 py-2.5 rounded-lg font-bold  rounded"
          >
            Approve
          </button>
          <button
            onClick={handleDeny}
            className="bg-neutral-600 hover:bg-neutral-700 text-white text-center px-5 py-2.5 rounded-lg font-bold  rounded"
          >
            Deny
          </button>
        </form>
      </div>
    </div>
  );
}
