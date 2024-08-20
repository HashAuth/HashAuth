import type { PageContextServer } from "vike/types";
import type Provider from "oidc-provider";
import { render } from "vike/abort";
import { errors } from "oidc-provider";
import * as jose from "jose";

export type Data = Awaited<ReturnType<typeof data>>;

import config from "../../../config/index";

export const data = async (pageContext: PageContextServer) => {
  try {
    const { uid, prompt, params, session } =
      await pageContext.provider.interactionDetails(
        pageContext.req,
        pageContext.res
      );
    const client = await pageContext.provider.Client.find(params.client_id);

    // TODO: Generate JWT for hashpack signing
    // Should include interaction ID, for now (MVP) not including desired accountId as that will complicate things.
    //  Will expect this JWT, plus signature, plus claimed accountId to be returned to /login endpoint
    // Will also verify interaction ID matches
    // For now, going to fake these tokens

    let authToken;

    if (prompt.name == "login") {
      const jwtPrivateKey = await jose.importPKCS8(
        config.JWT_PRIVATE_KEY,
        "RS256"
      );
      authToken = await new jose.SignJWT({ interaction: uid })
        .setProtectedHeader({ alg: "RS256" })
        .setAudience("hashauth-oidc")
        .setIssuer("hashauth-oidc")
        .setIssuedAt()
        .setExpirationTime("10m")
        .sign(jwtPrivateKey);
    }

    return {
      interaction: {
        client,
        uid,
        details: prompt.details,
        params,
        prompt: prompt.name,
        session: session,
      },
      ...(prompt.name == "login" && { authToken }),
    };
  } catch (error) {
    if (error instanceof errors.SessionNotFound)
      throw render(401, "No auth interaction is currently active.");
  }
};
