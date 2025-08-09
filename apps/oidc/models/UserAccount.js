import mongoose from "mongoose";

import config from "../config/index.js";

import SumsubIdentificationSchema from "./SumsubIdentification.js";

let UserAccountSchema = new mongoose.Schema(
    {
        accountId: { type: String },
        // TODO: Removing a linked wallet must ensure activeWallet is updated accordingly
        linkedWallets: [{ type: String, unique: true }], // Unique index prevents multiple UserAccounts from having any of the same linkedWallets. This is security critical!
        activeWallet: { type: String },
        nickname: { type: String },
        email: { type: String },
        kyc: { type: SumsubIdentificationSchema, default: () => ({}) },

        credits: { type: Number, default: 0 }, // Number of verification credits
    },
    { timestamps: true },
);

UserAccountSchema.methods.getActiveWallet = function () {
    if (this.activeWallet && this.linkedWallets.includes(this.activeWallet)) {
        return this.activeWallet;
    }
};

UserAccountSchema.methods.claims = async function (use, scope) {
    return {
        // For now, sub is the same across all of users linked wallets, and this accountId claim is what actually says which wallet they are.
        // TODO: This isn't suitable for production as it allows dApps to track which users own which wallets.
        accountId: this.activeWallet,
        email: this.email,
        email_verified: false,
        // kyc
        kycFirstName: this.kyc.firstName,
        kycLastName: this.kyc.lastName,
        kycAliasName: this.kyc.aliasName,
        kycDob: this.kyc.dob,
        kycCountry: this.kyc.country,
        kycIdDocs: this.kyc.idDocs,
    };
};

UserAccountSchema.statics.findAccountById = async function (ctx, id, token) {
    let UserAccount = mongoose.model("UserAccount");
    let account = await UserAccount.findById(id);
    return account;
};

mongoose.model("UserAccount", UserAccountSchema);

export default {};
