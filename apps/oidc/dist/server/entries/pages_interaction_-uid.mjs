import import1 from "vike-react/components/Loading";
import { onRenderHtml } from "vike-react/renderer/onRenderHtml";
import {
  H as HeadDefault,
  L as LayoutDefault,
} from "../chunks/chunk-BQdxvpkG.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
import { render } from "vike/abort";
import { errors } from "oidc-provider";
import * as querystring from "node:querystring";
import isEmpty from "lodash/isEmpty.js";
import { inspect } from "node:util";
import "vike-react/usePageContext";
function Page() {
  var _a, _b, _c;
  const interaction = useData();
  function handleDeny(event) {
    event.preventDefault();
    window.location.href = `/interaction/${interaction == null ? void 0 : interaction.uid}/abort`;
  }
  if ((interaction == null ? void 0 : interaction.prompt) == "login") {
    return /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("form", {
        autoComplete: "false",
        action:
          "/interaction/" +
          (interaction == null ? void 0 : interaction.uid) +
          "/login",
        method: "post",
        children: /* @__PURE__ */ jsxs("button", {
          type: "submit",
          className:
            "w-full bg-blue-500 hover:bg-blue-700 text-white text-center px-5 py-2.5 rounded-lg font-bold py-2 px-4 rounded",
          children: [
            /* @__PURE__ */ jsx("span", {
              className: "text-sm font-light text-center",
              children: "Authenticate with",
            }),
            /* @__PURE__ */ jsx("div", {
              className: " pt-1 items-center text-center justify-center",
            }),
            /* @__PURE__ */ jsxs("div", {
              className:
                "justify-center flex items-center text-2xl text-center font-semibold text-center",
              children: [
                /* @__PURE__ */ jsx("img", {
                  className: "w-8 h-8 mr-2",
                  src: "https://cdn.prod.website-files.com/61ce2e4bcaa2660da2bb419e/62e14973c65367120073a891_app-icon.webp",
                  alt: "logo",
                }),
                "HashPack",
              ],
            }),
          ],
        }),
      }),
    });
  } else if ((interaction == null ? void 0 : interaction.prompt) == "consent") {
    return /* @__PURE__ */ jsxs("div", {
      className: "container prose dark:prose-invert",
      children: [
        /* @__PURE__ */ jsxs("div", {
          className: "mb-5",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "text-center",
              children: [
                (
                  (_a = interaction == null ? void 0 : interaction.client) ==
                  null
                    ? void 0
                    : _a.logoUri
                )
                  ? /* @__PURE__ */ jsx("img", {
                      className: "mr-auto ml-auto mt-0 pt-0 mb-2 pb-0",
                      src:
                        (_b =
                          interaction == null ? void 0 : interaction.client) ==
                        null
                          ? void 0
                          : _b.logoUri,
                      width: "100",
                    })
                  : "",
                /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children:
                    (_c = interaction == null ? void 0 : interaction.client) ==
                    null
                      ? void 0
                      : _c.clientName,
                }),
                " would like access to your:",
              ],
            }),
            /* @__PURE__ */ jsxs("ul", {
              children: [
                /* @__PURE__ */ jsxs("li", {
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Wallet address",
                    }),
                    " (0.0.1337)",
                  ],
                }),
                /* @__PURE__ */ jsx("li", {
                  children: /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Display name",
                  }),
                }),
                /* @__PURE__ */ jsxs("li", {
                  className: "border rounded-md border-2 border-red-500 ",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "KYC profile",
                    }),
                    ", which includes your:",
                    /* @__PURE__ */ jsxs("ul", {
                      className: "font-medium",
                      children: [
                        /* @__PURE__ */ jsx("li", { children: "Full name" }),
                        /* @__PURE__ */ jsx("li", {
                          children: "Date of birth",
                        }),
                        /* @__PURE__ */ jsx("li", {
                          children: "Residential address",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsxs("form", {
            autoComplete: "false",
            action:
              "/interaction/" +
              (interaction == null ? void 0 : interaction.uid) +
              "/consent",
            method: "post",
            children: [
              /* @__PURE__ */ jsx("button", {
                type: "submit",
                className:
                  "bg-green-700 hover:bg-green-800 mr-1 text-white text-center px-10 py-2.5 rounded-lg font-bold  rounded",
                children: "Approve",
              }),
              /* @__PURE__ */ jsx("button", {
                onClick: handleDeny,
                className:
                  "bg-neutral-600 hover:bg-neutral-700 text-white text-center px-5 py-2.5 rounded-lg font-bold  rounded",
                children: "Deny",
              }),
            ],
          }),
        }),
      ],
    });
  }
  return /* @__PURE__ */ jsx("h1", {
    children: "Unhandled interaction prompt",
  });
}
const import5 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: Page,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
const keys = /* @__PURE__ */ new Set();
const debug = (obj) =>
  querystring.stringify(
    Object.entries(obj).reduce((acc, [key, value]) => {
      keys.add(key);
      if (isEmpty(value)) return acc;
      acc[key] = inspect(value, { depth: null });
      return acc;
    }, {}),
    "<br/>",
    ": ",
    {
      encodeURIComponent(value) {
        return keys.has(value) ? `<strong>${value}</strong>` : value;
      },
    },
  );
const data = async (pageContext) => {
  try {
    const { uid, prompt, params, session } =
      await pageContext.provider.interactionDetails(
        pageContext.req,
        pageContext.res,
      );
    const client = await pageContext.provider.Client.find(params.client_id);
    return {
      client,
      uid,
      details: prompt.details,
      params,
      prompt: prompt.name,
      session: session ? debug(session) : null,
      dbg: {
        params: debug(params),
        prompt: debug(prompt),
        client: debug(client),
      },
    };
  } catch (error) {
    if (error instanceof errors.SessionNotFound)
      throw render(401, "No auth interaction is currently active.");
  }
};
const import6 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      data,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function title(pageContext) {
  switch (pageContext.data.prompt) {
    case "login":
      return "HashAuth Login";
    case "consent":
      return "HashAuth Consent";
    default:
      return "HashAuth Interaction";
  }
}
const import7 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      title,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
const configValuesSerialized = {
  ["Loading"]: {
    type: "standard",
    definedAtData: {
      filePathToShowToUser: "vike-react/components/Loading",
      fileExportPathToShowToUser: [],
    },
    valueSerialized: {
      type: "pointer-import",
      value: import1,
    },
  },
  ["onRenderHtml"]: {
    type: "standard",
    definedAtData: {
      filePathToShowToUser: "vike-react/renderer/onRenderHtml",
      fileExportPathToShowToUser: [],
    },
    valueSerialized: {
      type: "pointer-import",
      value: onRenderHtml,
    },
  },
  ["Head"]: {
    type: "standard",
    definedAtData: {
      filePathToShowToUser: "/layouts/HeadDefault.tsx",
      fileExportPathToShowToUser: [],
    },
    valueSerialized: {
      type: "pointer-import",
      value: HeadDefault,
    },
  },
  ["Layout"]: {
    type: "cumulative",
    definedAtData: [
      {
        filePathToShowToUser: "/layouts/LayoutDefault.tsx",
        fileExportPathToShowToUser: [],
      },
    ],
    valueSerialized: [
      {
        type: "pointer-import",
        value: LayoutDefault,
      },
    ],
  },
  ["passToClient"]: {
    type: "cumulative",
    definedAtData: [
      {
        filePathToShowToUser: "/pages/+config.ts",
        fileExportPathToShowToUser: ["default", "passToClient"],
      },
      {
        filePathToShowToUser: "vike-react/config",
        fileExportPathToShowToUser: ["default", "passToClient"],
      },
    ],
    valueSerialized: [
      {
        type: "js-serialized",
        value: ["isTestnet"],
      },
      {
        type: "js-serialized",
        value: [],
      },
    ],
  },
  ["Page"]: {
    type: "standard",
    definedAtData: {
      filePathToShowToUser: "/pages/interaction/@uid/+Page.tsx",
      fileExportPathToShowToUser: [],
    },
    valueSerialized: {
      type: "plus-file",
      exportValues: import5,
    },
  },
  ["data"]: {
    type: "standard",
    definedAtData: {
      filePathToShowToUser: "/pages/interaction/@uid/+data.ts",
      fileExportPathToShowToUser: [],
    },
    valueSerialized: {
      type: "plus-file",
      exportValues: import6,
    },
  },
  ["title"]: {
    type: "standard",
    definedAtData: {
      filePathToShowToUser: "/pages/interaction/@uid/+title.ts",
      fileExportPathToShowToUser: [],
    },
    valueSerialized: {
      type: "plus-file",
      exportValues: import7,
    },
  },
};
export { configValuesSerialized };
