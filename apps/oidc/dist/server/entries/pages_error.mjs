import import1 from "vike-react/components/Loading";
import { onRenderHtml } from "vike-react/renderer/onRenderHtml";
import { H as HeadDefault, L as LayoutDefault } from "../chunks/chunk-BQdxvpkG.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { usePageContext } from "vike-react/usePageContext";
import "vike-react/useData";
function Page() {
  const pageContext = usePageContext();
  let msg;
  const { abortReason, abortStatusCode } = pageContext;
  if (abortReason == null ? void 0 : abortReason.notAdmin) {
    msg = "You cannot access this page because you aren't an administrator.";
  } else if (typeof abortReason === "string") {
    msg = abortReason;
  } else if (abortStatusCode === 403) {
    msg = "You cannot access this page because you don't have enough privileges.";
  } else if (abortStatusCode === 401) {
    msg = "You cannot access this page because you aren't logged in. Please log in.";
  } else {
    msg = pageContext.is404 ? "This page doesn't exist." : "Something went wrong. Sincere apologies. Try again (later).";
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-4 mb-4 text-sm text-center text-black rounded-lg bg-red-50", role: "alert", children: [
    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Error: " }),
    msg
  ] });
}
const import5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Page
}, Symbol.toStringTag, { value: "Module" }));
const configValuesSerialized = {
  ["Loading"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/components/Loading", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: import1
    }
  },
  ["onRenderHtml"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/renderer/onRenderHtml", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: onRenderHtml
    }
  },
  ["Head"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/layouts/HeadDefault.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: HeadDefault
    }
  },
  ["Layout"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/layouts/LayoutDefault.tsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "pointer-import",
      value: LayoutDefault
    }]
  },
  ["passToClient"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }],
    valueSerialized: [{
      type: "js-serialized",
      value: ["isTestnet"]
    }, {
      type: "js-serialized",
      value: []
    }]
  },
  ["title"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "title"] },
    valueSerialized: {
      type: "js-serialized",
      value: "HashAuth"
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/_error/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import5
    }
  }
};
export {
  configValuesSerialized
};
