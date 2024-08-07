import type { PageContext } from "vike/types";
import type { Data } from "./+data.js";

export function title(pageContext: PageContext<Data>) {
  switch (pageContext.data.prompt) {
    case "login":
      return "HashAuth Login";
    case "consent":
      return "HashAuth Consent";
    default:
      return "HashAuth Interaction";
  }
}
