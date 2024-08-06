import type { PageContext } from "vike/types";
import type { Data } from "./+data.js";

export function title(pageContext: PageContext<Data>) {
  if (pageContext.data.prompt == "login") {
    return "HashAuth Login";
  }
  return "HashAuth Interaction"
}
