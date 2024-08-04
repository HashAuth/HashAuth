import import1 from "vike-react/components/Loading";
import { onRenderHtml } from "vike-react/renderer/onRenderHtml";
import { H as HeadDefault, L as LayoutDefault } from "../chunks/chunk-DBGxp5uL.js";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
import { useState } from "react";
import "vike-react/usePageContext";
function TodoList({ initialTodoItems }) {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [newTodo, setNewTodo] = useState("");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("ul", { children: todoItems.map((todoItem) => /* @__PURE__ */ jsx("li", { children: todoItem.text }, todoItem.text)) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: async (ev) => {
          ev.preventDefault();
          setTodoItems((prev) => [...prev, { text: newTodo }]);
          try {
            const response = await fetch("/api/todo/create", {
              method: "POST",
              body: JSON.stringify({ text: newTodo }),
              headers: {
                "Content-Type": "application/json"
              }
            });
            await response.blob();
            setNewTodo("");
          } catch (e) {
            console.error(e);
            setTodoItems((prev) => prev.slice(0, -1));
          }
        },
        children: [
          /* @__PURE__ */ jsx("input", { type: "text", onChange: (ev) => setNewTodo(ev.target.value), value: newTodo }),
          " ",
          /* @__PURE__ */ jsx("button", { type: "submit", children: "Add to-do" })
        ]
      }
    ) })
  ] });
}
function Page() {
  const data2 = useData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { children: "To-do List" }),
    /* @__PURE__ */ jsx(TodoList, { initialTodoItems: data2.todo })
  ] });
}
const import5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const todos = {
  todo: [{ text: "Buy milk" }, { text: "Buy strawberries" }]
};
async function data(pageContext) {
  console.log("CALLED!");
  return todos;
}
const import6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: data
}, Symbol.toStringTag, { value: "Module" }));
const guard = async (pageContext) => {
};
const import7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  guard
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
  ["title"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "title"] },
    valueSerialized: {
      type: "js-serialized",
      value: "My Vike App"
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/todo/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import5
    }
  },
  ["data"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/todo/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import6
    }
  },
  ["guard"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/todo/+guard.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import7
    }
  }
};
export {
  configValuesSerialized
};
