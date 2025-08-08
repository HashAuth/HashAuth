import { redirect } from "vike/abort";
import { PageContextServer } from "vike/types";
import { render } from "vike/abort";
import { errors } from "oidc-provider";

export async function guard(pageContext: PageContextServer) {
    try {
        const { uid, prompt, params, session } = await pageContext.provider.interactionDetails(pageContext.req, pageContext.res);

        if (prompt.name != "login" && !pageContext.user) {
            throw render(401, "Not currently logged in.");
        }
    } catch (error) {
        throw render(401, "No auth interaction is currently active.");
    }
}
