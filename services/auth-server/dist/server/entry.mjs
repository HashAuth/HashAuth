import { setImportBuildGetters } from "vike/__internal/loadImportBuild";
const pageFilesLazy = {};
const pageFilesEager = {};
const pageFilesExportNamesLazy = {};
const pageFilesExportNamesEager = {};
const pageFilesList = [];
const neverLoaded = {};
const pageConfigsSerialized = [
  {
    pageId: "/pages/_error",
    isErrorPage: true,
    routeFilesystem: void 0,
    loadConfigValuesAll: () => import("./entries/pages_error.mjs"),
    configValuesSerialized: {
      ["clientEntryLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/", "definedBy": "/pages/index/" },
    loadConfigValuesAll: () => import("./entries/pages_index.mjs"),
    configValuesSerialized: {
      ["clientEntryLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/star-wars/@id",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/star-wars/@id", "definedBy": "/pages/star-wars/@id/" },
    loadConfigValuesAll: () => import("./entries/pages_star-wars_-id.mjs"),
    configValuesSerialized: {
      ["clientEntryLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/star-wars/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/star-wars", "definedBy": "/pages/star-wars/index/" },
    loadConfigValuesAll: () => import("./entries/pages_star-wars_index.mjs"),
    configValuesSerialized: {
      ["clientEntryLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/todo",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/todo", "definedBy": "/pages/todo/" },
    loadConfigValuesAll: () => import("./entries/pages_todo.mjs"),
    configValuesSerialized: {
      ["clientEntryLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  }
];
const pageConfigGlobalSerialized = {
  configValuesSerialized: {}
};
const pageFilesLazyIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyIsomorph = { ...pageFilesLazyIsomorph1 };
pageFilesLazy[".page"] = pageFilesLazyIsomorph;
const pageFilesLazyServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyServer = { ...pageFilesLazyServer1 };
pageFilesLazy[".page.server"] = pageFilesLazyServer;
const pageFilesEagerRoute1 = /* @__PURE__ */ Object.assign({});
const pageFilesEagerRoute = { ...pageFilesEagerRoute1 };
pageFilesEager[".page.route"] = pageFilesEagerRoute;
const pageFilesExportNamesEagerClient1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerClient = { ...pageFilesExportNamesEagerClient1 };
pageFilesExportNamesEager[".page.client"] = pageFilesExportNamesEagerClient;
const pageFiles = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  neverLoaded,
  pageConfigGlobalSerialized,
  pageConfigsSerialized,
  pageFilesEager,
  pageFilesExportNamesEager,
  pageFilesExportNamesLazy,
  pageFilesLazy,
  pageFilesList
}, Symbol.toStringTag, { value: "Module" }));
{
  const assetsManifest = {
  "../../node_modules/.pnpm/vike@0.4.182_react-streaming@0.3.43_react-dom@18.3.1_react@18.3.1__react@18.3.1__vite@5.3.5_@types+node@22.0.2_/node_modules/vike/dist/esm/client/client-routing-runtime/entry.js": {
    "file": "assets/entries/entry-client-routing.ChvJELJA.js",
    "name": "entries/entry-client-routing",
    "src": "../../node_modules/.pnpm/vike@0.4.182_react-streaming@0.3.43_react-dom@18.3.1_react@18.3.1__react@18.3.1__vite@5.3.5_@types+node@22.0.2_/node_modules/vike/dist/esm/client/client-routing-runtime/entry.js",
    "isEntry": true,
    "dynamicImports": [
      "virtual:vike:pageConfigValuesAll:client:/pages/_error",
      "virtual:vike:pageConfigValuesAll:client:/pages/index",
      "virtual:vike:pageConfigValuesAll:client:/pages/star-wars/@id",
      "virtual:vike:pageConfigValuesAll:client:/pages/star-wars/index",
      "virtual:vike:pageConfigValuesAll:client:/pages/todo"
    ]
  },
  "_chunk-!~{007}~.js": {
    "file": "assets/static/onPageTransitionStart.Db35thue.css",
    "src": "_chunk-!~{007}~.js"
  },
  "_chunk-BbIK5mfv.js": {
    "file": "assets/chunks/chunk-BbIK5mfv.js",
    "name": "useData",
    "imports": [
      "_chunk-D_wXlRLG.js"
    ]
  },
  "_chunk-D_wXlRLG.js": {
    "file": "assets/chunks/chunk-D_wXlRLG.js",
    "name": "_onPageTransitionStart",
    "css": [
      "assets/static/onPageTransitionStart.Db35thue.css"
    ],
    "assets": [
      "assets/static/logo.2_7Lo9tV.svg"
    ]
  },
  "assets/logo.svg": {
    "file": "assets/static/logo.2_7Lo9tV.svg",
    "src": "assets/logo.svg"
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/_error": {
    "file": "assets/entries/pages_error.DO-1VTeJ.js",
    "name": "entries/pages/_error",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_wXlRLG.js"
    ],
    "css": [
      "assets/static/LayoutDefault.CQ0dC2LK.css"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/index": {
    "file": "assets/entries/pages_index.CwBHu4cU.js",
    "name": "entries/pages/index",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_wXlRLG.js"
    ],
    "css": [
      "assets/static/LayoutDefault.CQ0dC2LK.css"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/star-wars/@id": {
    "file": "assets/entries/pages_star-wars_-id.DzOMjOfd.js",
    "name": "entries/pages/star-wars/@id",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/star-wars/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_wXlRLG.js",
      "_chunk-BbIK5mfv.js"
    ],
    "css": [
      "assets/static/LayoutDefault.CQ0dC2LK.css"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/star-wars/index": {
    "file": "assets/entries/pages_star-wars_index.DwWIW7CI.js",
    "name": "entries/pages/star-wars/index",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/star-wars/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_wXlRLG.js",
      "_chunk-BbIK5mfv.js"
    ],
    "css": [
      "assets/static/LayoutDefault.CQ0dC2LK.css"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/todo": {
    "file": "assets/entries/pages_todo.CzaE9rKm.js",
    "name": "entries/pages/todo",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/todo",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_wXlRLG.js",
      "_chunk-BbIK5mfv.js"
    ],
    "css": [
      "assets/static/LayoutDefault.CQ0dC2LK.css"
    ]
  }
};
  const pluginManifest = {
    "version": "0.4.182",
    "usesClientRouter": false,
    "baseServer": "/",
    "baseAssets": "/",
    "includeAssetsImportedByServer": true,
    "redirects": {},
    "trailingSlash": false,
    "disableUrlNormalization": false
  };
  setImportBuildGetters({
    pageFiles: () => pageFiles,
    getAssetsManifest: () => assetsManifest,
    pluginManifest: () => pluginManifest
  });
}
