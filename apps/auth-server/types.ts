import type Provider from "oidc-provider";

declare module 'vike/types' {
    interface PageContextServer {
      provider: Provider
      req: any
      res: any
      isTestnet: boolean
    }

    interface PageContextClient {
        isTestnet: boolean
      }
}