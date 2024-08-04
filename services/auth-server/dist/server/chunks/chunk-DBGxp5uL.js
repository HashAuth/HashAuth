import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePageContext } from "vike-react/usePageContext";
const logoUrl = "/assets/static/logo.2_7Lo9tV.svg";
function HeadDefault() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: "Demo showcasing Vike" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", href: logoUrl })
  ] });
}
function Link({ href, children }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return /* @__PURE__ */ jsx("a", { href, className: isActive ? "is-active" : void 0, children });
}
function LayoutDefault({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex max-w-5xl m-auto", children: [
    /* @__PURE__ */ jsxs(Sidebar, { children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(Link, { href: "/", children: "Welcome" }),
      /* @__PURE__ */ jsx(Link, { href: "/todo", children: "Todo" }),
      /* @__PURE__ */ jsx(Link, { href: "/star-wars", children: "Data Fetching" })
    ] }),
    /* @__PURE__ */ jsx(Content, { children })
  ] });
}
function Sidebar({ children }) {
  return /* @__PURE__ */ jsx("div", { id: "sidebar", className: "p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200", children });
}
function Content({ children }) {
  return /* @__PURE__ */ jsx("div", { id: "page-container", children: /* @__PURE__ */ jsx("div", { id: "page-content", className: "p-5 pb-12 min-h-screen", children }) });
}
function Logo() {
  return /* @__PURE__ */ jsx("div", { className: "p-5 mb-2", children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("img", { src: logoUrl, height: 64, width: 64, alt: "logo" }) }) });
}
export {
  HeadDefault as H,
  LayoutDefault as L
};
