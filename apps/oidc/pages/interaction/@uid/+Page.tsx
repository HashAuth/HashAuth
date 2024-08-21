import React from "react";
import { useData } from "vike-react/useData";

import type { Data } from "./+data.js";

import Login from "./components/Login.jsx";
import Consent from "./components/Consent.jsx";

export default function Page() {
  const data = useData<Data>();

  if (data?.interaction?.prompt == "login") {
    return <Login />;
  } else if (data?.interaction?.prompt == "consent") {
    return <Consent />;
  }
  return <h1>Unhandled interaction prompt</h1>;
}
