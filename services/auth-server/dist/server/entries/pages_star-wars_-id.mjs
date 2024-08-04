import import1 from "vike-react/components/Loading";
import { onRenderHtml } from "vike-react/renderer/onRenderHtml";
import { H as HeadDefault, L as LayoutDefault } from "../chunks/chunk-DBGxp5uL.js";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
import fetch from "cross-fetch";
import "vike-react/usePageContext";
function Page() {
  const movie = useData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { children: movie.title }),
    "Release Date: ",
    movie.release_date,
    /* @__PURE__ */ jsx("br", {}),
    "Director: ",
    movie.director,
    /* @__PURE__ */ jsx("br", {}),
    "Producer: ",
    movie.producer
  ] });
}
const import5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const data = async (pageContext) => {
  const response = await fetch(`https://brillout.github.io/star-wars/api/films/${pageContext.routeParams.id}.json`);
  let movie = await response.json();
  movie = minimize(movie);
  return movie;
};
function minimize(movie) {
  const { id, title: title2, release_date, director, producer } = movie;
  const minimizedMovie = { id, title: title2, release_date, director, producer };
  return minimizedMovie;
}
const import6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
function title(pageContext) {
  const movie = pageContext.data;
  return movie.title;
}
const import7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title
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
  ["passToClient"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }],
    valueSerialized: [{
      type: "js-serialized",
      value: []
    }]
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
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/star-wars/@id/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import5
    }
  },
  ["data"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/star-wars/@id/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import6
    }
  },
  ["title"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/star-wars/@id/+title.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import7
    }
  }
};
export {
  configValuesSerialized
};
