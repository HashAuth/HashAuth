import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
function HeadDefault() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "Demo showcasing Vike",
      }),
    ],
  });
}
function LayoutDefault({ children }) {
  useData();
  const pageContext = usePageContext();
  return /* @__PURE__ */ jsx("section", {
    className: "bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsx("div", {
      className:
        "flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0",
      children: /* @__PURE__ */ jsx("div", {
        className:
          "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
        children: /* @__PURE__ */ jsxs("div", {
          className: "p-6 space-y-4 md:space-y-6 sm:p-8",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className:
                "p-4 mb-4 text-sm text-center text-blue-800 rounded-lg bg-blue-50",
              role: "alert",
              children: [
                "HashAuth is currently in ",
                /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "ALPHA",
                }),
                ".",
              ],
            }),
            /* @__PURE__ */ jsxs("h1", {
              className:
                "text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
              children: [
                "HashAuth ",
                /* @__PURE__ */ jsx("span", {
                  className: "text-xs text-red-700",
                  children: pageContext.isTestnet ? "TESTNET" : "",
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-4 md:space-y-6",
              children: [
                children,
                /* @__PURE__ */ jsx("div", {
                  className:
                    "text-sm font-light text-gray-500 dark:text-gray-400 text-center",
                  children: "Report a bug | Terms and Conditions",
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
}
export { HeadDefault as H, LayoutDefault as L };
