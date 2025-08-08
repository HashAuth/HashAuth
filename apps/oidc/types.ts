import type Provider from "oidc-provider";

declare module "vike/types" {
    interface PageContextServer {
        provider: Provider;
        req: any;
        res: any;
        isTestnet: boolean;
        isDevelopment: boolean;
        user: {
            id: string;
            activeWallet: string;
        };
    }

    interface PageContextClient {
        isTestnet: boolean;
        isDevelopment: boolean;
        user: {
            id: string;
            activeWallet: string;
        };
    }
}
