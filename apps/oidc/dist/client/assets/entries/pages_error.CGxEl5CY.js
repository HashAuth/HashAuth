import {
  u as r,
  j as i,
  i as n,
  o as s,
  L as l,
  a as d,
  b as p,
} from "../chunks/chunk-DoDNhFOO.js";
function u() {
  const a = r();
  let e;
  const { abortReason: t, abortStatusCode: o } = a;
  return (
    t != null && t.notAdmin
      ? (e = "You cannot access this page because you aren't an administrator.")
      : typeof t == "string"
        ? (e = t)
        : o === 403
          ? (e =
              "You cannot access this page because you don't have enough privileges.")
          : o === 401
            ? (e =
                "You cannot access this page because you aren't logged in. Please log in.")
            : (e = a.is404
                ? "This page doesn't exist."
                : "Something went wrong. Sincere apologies. Try again (later)."),
    i.jsxs("div", {
      className: "p-4 mb-4 text-sm text-center text-black rounded-lg bg-red-50",
      role: "alert",
      children: [
        i.jsx("span", { className: "font-medium", children: "Error: " }),
        e,
      ],
    })
  );
}
const f = Object.freeze(
    Object.defineProperty({ __proto__: null, Page: u }, Symbol.toStringTag, {
      value: "Module",
    }),
  ),
  T = {
    onBeforeRenderEnv: {
      type: "computed",
      definedAtData: null,
      valueSerialized: { type: "js-serialized", value: null },
    },
    dataEnv: {
      type: "computed",
      definedAtData: null,
      valueSerialized: { type: "js-serialized", value: null },
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
      valueSerialized: { type: "pointer-import", value: s },
    },
    Layout: {
      type: "cumulative",
      definedAtData: [
        {
          filePathToShowToUser: "/layouts/LayoutDefault.tsx",
          fileExportPathToShowToUser: [],
        },
      ],
      valueSerialized: [{ type: "pointer-import", value: l }],
    },
    title: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/+config.ts",
        fileExportPathToShowToUser: ["default", "title"],
      },
      valueSerialized: { type: "js-serialized", value: "HashAuth" },
    },
    onPageTransitionEnd: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/+onPageTransitionEnd.ts",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "plus-file", exportValues: d },
    },
    onPageTransitionStart: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/+onPageTransitionStart.ts",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "plus-file", exportValues: p },
    },
    Page: {
      type: "standard",
      definedAtData: {
        filePathToShowToUser: "/pages/_error/+Page.tsx",
        fileExportPathToShowToUser: [],
      },
      valueSerialized: { type: "plus-file", exportValues: f },
    },
  };
export { T as configValuesSerialized };
