import {
  c as i,
  j as e,
  i as n,
  o as d,
  L as u,
  a as p,
  b as c,
} from "../chunks/chunk-DoDNhFOO.js";
function h() {
  var a, o, r;
  const t = i();
  function l(s) {
    s.preventDefault(),
      (window.location.href = `/interaction/${t == null ? void 0 : t.uid}/abort`);
  }
  return (t == null ? void 0 : t.prompt) == "login"
    ? e.jsx("div", {
        children: e.jsx("form", {
          autoComplete: "false",
          action: "/interaction/" + (t == null ? void 0 : t.uid) + "/login",
          method: "post",
          children: e.jsxs("button", {
            type: "submit",
            className:
              "w-full bg-blue-500 hover:bg-blue-700 text-white text-center px-5 py-2.5 rounded-lg font-bold py-2 px-4 rounded",
            children: [
              e.jsx("span", {
                className: "text-sm font-light text-center",
                children: "Authenticate with",
              }),
              e.jsx("div", {
                className: " pt-1 items-center text-center justify-center",
              }),
              e.jsxs("div", {
                className:
                  "justify-center flex items-center text-2xl text-center font-semibold text-center",
                children: [
                  e.jsx("img", {
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
      })
    : (t == null ? void 0 : t.prompt) == "consent"
      ? e.jsxs("div", {
          className: "container prose dark:prose-invert",
          children: [
            e.jsxs("div", {
              className: "mb-5",
              children: [
                e.jsxs("div", {
                  className: "text-center",
                  children: [
                    (a = t == null ? void 0 : t.client) != null && a.logoUri
                      ? e.jsx("img", {
                          className: "mr-auto ml-auto mt-0 pt-0 mb-2 pb-0",
                          src:
                            (o = t == null ? void 0 : t.client) == null
                              ? void 0
                              : o.logoUri,
                          width: "100",
                        })
                      : "",
                    e.jsx("span", {
                      className: "font-medium",
                      children:
                        (r = t == null ? void 0 : t.client) == null
                          ? void 0
                          : r.clientName,
                    }),
                    " would like access to your:",
                  ],
                }),
                e.jsxs("ul", {
                  children: [
                    e.jsxs("li", {
                      children: [
                        e.jsx("span", {
                          className: "font-medium",
                          children: "Wallet address",
                        }),
                        " (0.0.1337)",
                      ],
                    }),
                    e.jsx("li", {
                      children: e.jsx("span", {
                        className: "font-medium",
                        children: "Display name",
                      }),
                    }),
                    e.jsxs("li", {
                      className: "border rounded-md border-2 border-red-500 ",
                      children: [
                        e.jsx("span", {
                          className: "font-medium",
                          children: "KYC profile",
                        }),
                        ", which includes your:",
                        e.jsxs("ul", {
                          className: "font-medium",
                          children: [
                            e.jsx("li", { children: "Full name" }),
                            e.jsx("li", { children: "Date of birth" }),
                            e.jsx("li", { children: "Residential address" }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              children: e.jsxs("form", {
                autoComplete: "false",
                action:
                  "/interaction/" + (t == null ? void 0 : t.uid) + "/consent",
                method: "post",
                children: [
                  e.jsx("button", {
                    type: "submit",
                    className:
                      "bg-green-700 hover:bg-green-800 mr-1 text-white text-center px-10 py-2.5 rounded-lg font-bold  rounded",
                    children: "Approve",
                  }),
                  e.jsx("button", {
                    onClick: l,
                    className:
                      "bg-neutral-600 hover:bg-neutral-700 text-white text-center px-5 py-2.5 rounded-lg font-bold  rounded",
                    children: "Deny",
                  }),
                ],
              }),
            }),
          ],
        })
      : e.jsx("h1", { children: "Unhandled interaction prompt" });
}
const m = Object.freeze(
  Object.defineProperty({ __proto__: null, default: h }, Symbol.toStringTag, {
    value: "Module",
  }),
);
function f(t) {
  switch (t.data.prompt) {
    case "login":
      return "HashAuth Login";
    case "consent":
      return "HashAuth Consent";
    default:
      return "HashAuth Interaction";
  }
}
const x = Object.freeze(
    Object.defineProperty({ __proto__: null, title: f }, Symbol.toStringTag, {
      value: "Module",
    }),
  ),
  g = {
    onBeforeRenderEnv: {
      type: "computed",
      definedAtData: null,
      valueSerialized: { type: "js-serialized", value: null },
    },
    dataEnv: {
      type: "computed",
      definedAtData: null,
      valueSerialized: { type: "js-serialized", value: { server: !0 } },
    },
    Loading: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "vike-react/components/Loading",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "pointer-import", value: n },
    },
    hydrationCanBeAborted: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "vike-react/config",
        fileExportPathToShowToUser: ["default", "hydrationCanBeAborted"],
      },
      valueSerialized: { type: "js-serialized", value: !0 },
    },
    onRenderClient: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "vike-react/renderer/onRenderClient",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "pointer-import", value: d },
    },
    Layout: {
      type: "cumulative",
      definedAtData: [
        {
          filePathToShowToUser: "/layouts/LayoutDefault.tsx",
          fileExportPathToShowToUser: [],
        },
      ],
      valueSerialized: [{ type: "pointer-import", value: u }],
    },
    onPageTransitionEnd: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/+onPageTransitionEnd.ts",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "plus-file", exportValues: p },
    },
    onPageTransitionStart: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/+onPageTransitionStart.ts",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "plus-file", exportValues: c },
    },
    Page: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/interaction/@uid/+Page.tsx",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "plus-file", exportValues: m },
    },
    title: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/interaction/@uid/+title.ts",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "plus-file", exportValues: x },
    },
  };
export { g as configValuesSerialized };
