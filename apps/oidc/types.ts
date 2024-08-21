import type Provider from "oidc-provider";

declare module "vike/types" {
  interface PageContextServer {
    provider: Provider;
    req: any;
    res: any;
    isTestnet: boolean;
    isDevelopment: boolean;
    accountId: string;
  }

  interface PageContextClient {
    isTestnet: boolean;
    accountId: string;
    isDevelopment: boolean;
  }
}
