import React from "react";
import { useData } from "vike-react/useData";

import Consent from "./components/Consent.jsx";
import SelectAccount from "./components/SelectAccount.jsx";
import Identify from "../../identify/+Page.jsx";
import LinkWallet from "../../link-wallet/+Page.jsx";

export default function Page() {
    const data = useData<any>();

    if (data?.interaction?.prompt == "login") {
        return <LinkWallet isInteraction={true}></LinkWallet>;
    } else if (data?.interaction?.prompt == "consent") {
        return <Consent />;
    } else if (data?.interaction?.prompt == "identify") {
        return <Identify isInteraction={true}></Identify>;
    } else if (data?.interaction?.prompt == "select_account") {
        return <SelectAccount />;
    }
    return <h1>Unhandled interaction prompt</h1>;
}
