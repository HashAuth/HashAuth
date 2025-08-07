import type { PageContextServer } from "vike/types";
import type Provider from "oidc-provider";
import mongoose from "mongoose";
import { render } from "vike/abort";
import { errors } from "oidc-provider";
import * as jose from "jose";

const UserAccount = mongoose.model("UserAccount");

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    if (pageContext.accountId) {
        let account;
        try {
            account = await UserAccount.findById(pageContext.accountId);
        } catch (error) {
            throw render(500, "Internal databse error. Please refresh and try again.");
        }

        if (!account) {
            // Weird, shouldn't happen
            throw render(500, "Internal database error. Please refresh and try again.");
        }

        return {
            account: {
                activeWallet: account.activeWallet,
                linkedWallets: account.linkedWallets,
                nickname: account.nickname,
                email: account.email,
                //    kyc: account.kycDocument,
            },
        };
    }
};
