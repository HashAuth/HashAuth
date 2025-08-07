import { PageContextServer } from "vike/types";
import { render } from "vike/abort";

export async function guard(pageContext: PageContextServer) {
    try {
        if (!pageContext.accountId) {
            throw render(401, "Not currently logged in.");
        }
    } catch (error) {
        throw render(401, "No auth interaction is currently active.");
    }
}
