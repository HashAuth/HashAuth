import { redirect } from "vike/abort";
import { PageContextServer } from "vike/types";

export async function guard(pageContext: PageContextServer) {
    if (!pageContext.user) {
        throw redirect(
            `/oidc/auth?client_id=hashauth&response_type=none&redirect_uri=${pageContext.isDevelopment ? "http://localhost" : "https://hashauth.io"}&scope=openid&nonce=foobar&response_mode=fragment&prompt=login`,
        );
    }
}
