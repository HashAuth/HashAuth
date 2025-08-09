import type { PageContextServer } from "vike/types";
import type Provider from "oidc-provider";
import { render } from "vike/abort";
import { errors } from "oidc-provider";
import * as jose from "jose";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    let config = null;
    if (typeof window === "undefined") {
        config = (await import("../../../config/index.js")).default;
    }

    try {
        // TODO: Generate JWT for hashpack signing
        // Should include interaction ID, for now (MVP) not including desired accountId as that will complicate things.
        //  Will expect this JWT, plus signature, plus claimed accountId to be returned to /login endpoint
        // Will also verify interaction ID matches
        // For now, going to fake these tokens

        let authToken;

        const jwtPrivateKey = await jose.importPKCS8(config.JWT_PRIVATE_KEY, "RS256");
        authToken = await new jose.SignJWT({ userId: pageContext.user.id })
            .setProtectedHeader({ alg: "RS256" })
            .setAudience("hashauth-oidc")
            .setIssuer("hashauth-oidc")
            .setIssuedAt()
            .setExpirationTime("10m")
            .sign(jwtPrivateKey);

        return { authToken };
    } catch (error) {
        throw render(500, "Something went wrong");
    }
};
