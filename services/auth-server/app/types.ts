import type  Provider from 'oidc-provider';
import * as http from 'http';

declare module '@remix-run/node' {
  interface AppLoadContext {
    oidcProvider: Provider
    req: http.IncomingMessage
    res: http.ServerResponse<http.IncomingMessage>
  }
}