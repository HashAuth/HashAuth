import React from "react";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";

import type { Data } from "./+data.js";

export default function Identify() {
  const data = useData<Data>();
  const pageContext = usePageContext();

  return (
    <div className="container prose dark:prose-invert">
     
    </div>
  );
}
