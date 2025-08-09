import React, { useRef } from "react";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";

import type { Data } from "../+data.js";

export default function SelectAccount() {
    const data = useData<Data>();

    const pageContext = usePageContext();
    const selectAccountFormRef = useRef<HTMLFormElement>(null);
    const walletRef = useRef<HTMLInputElement>(null);

    async function handleSelectAccount(event: any) {
        event.preventDefault();

        const btn = event.target;
        console.log(event);

        let selectedWallet = btn?.value;
        console.log(selectedWallet);
        if (walletRef.current) {
            walletRef.current.value = selectedWallet;
        }

        selectAccountFormRef.current?.submit();
    }

    return (
        <div className="text-center">
            <span className="font-medium">
                Select a wallet to continue to <br />
                <span className="font-bold text-white">{data?.interaction?.client?.clientName}</span>
            </span>
            <form
                ref={selectAccountFormRef}
                autoComplete="false"
                action={"/interaction/" + data?.interaction?.uid + "/select_account"}
                method="post"
            >
                <input hidden ref={walletRef} readOnly type="text" name="wallet"></input>
                <ul className="">
                    {pageContext.user.linkedWallets.map((item, index) => (
                        <button
                            type="submit"
                            onClick={handleSelectAccount}
                            className="w-7/12 mt-2 bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-4 rounded"
                            key={index}
                            value={item}
                        >
                            {item}
                        </button>
                    ))}
                </ul>
            </form>
        </div>
    );
}
