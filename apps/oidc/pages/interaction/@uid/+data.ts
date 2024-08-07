import type { PageContextServer } from "vike/types";
import type Provider from "oidc-provider";
import { render } from "vike/abort";
import { errors } from "oidc-provider";

// temporary for debug viewing
import * as querystring from "node:querystring";
import isEmpty from "lodash/isEmpty.js";
import { inspect } from "node:util";

export type Data = Awaited<ReturnType<typeof data>>;

const keys = new Set();
const debug = (obj) =>
  querystring.stringify(
    Object.entries(obj).reduce((acc, [key, value]) => {
      keys.add(key);
      if (isEmpty(value)) return acc;
      acc[key] = inspect(value, { depth: null });
      return acc;
    }, {}),
    "<br/>",
    ": ",
    {
      encodeURIComponent(value) {
        return keys.has(value) ? `<strong>${value}</strong>` : value;
      },
    },
  );

export const data = async (pageContext: PageContextServer) => {
  try {
    const { uid, prompt, params, session } =
      await pageContext.provider.interactionDetails(
        pageContext.req,
        pageContext.res,
      );
    const client = await pageContext.provider.Client.find(params.client_id);

    if (prompt.name == "login") {
      // TODO: Generate JWT for hashpack signing
      // Should include interaction ID, for now (MVP) not including desired accountId as that will complicate things.
      //  Will expect this JWT, plus signature, plus claimed accountId to be returned to /login endpoint
    }

    return {
      client,
      uid,
      details: prompt.details,
      params,
      prompt: prompt.name,
      session: session ? debug(session) : null,
      dbg: {
        params: debug(params),
        prompt: debug(prompt),
        client: debug(client),
      },
    };
  } catch (error) {
    if (error instanceof errors.SessionNotFound)
      throw render(401, "No auth interaction is currently active.");
  }
};
