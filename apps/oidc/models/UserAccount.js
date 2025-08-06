import mongoose from "mongoose";

import IdDocumentSchema from "./IdDocument.js";
import config from "../config/index.server.js";

let UserAccountSchema = new mongoose.Schema(
    {
        accountId: { type: String }, //band-aid for node-oidc-provider requirement

        linkedWallets: [{ type: String }],
        activeWallet: { type: String },

        nickname: { type: String },
        email: { type: String },
        kycDocument: IdDocumentSchema,

        credits: { type: Number, default: 0 }, // Number of verification credits
    },
    { timestamps: true },
);

UserAccountSchema.pre("save", function (next) {
    if (!this.accountId) {
        this.accountId = this._id;
    }

    let IdDocument = mongoose.model("IdDocument");
    if (!this.kycDocument) {
        this.kycDocument = new IdDocument();
    }
    next();
});

UserAccountSchema.methods.getActiveWallet = function () {
    if (this.activeWallet && this.linkedWallets.includes(this.activeWallet)) {
        return this.activeWallet;
    }
};

UserAccountSchema.methods.claims = async function (use, scope) {
    return {
        sub: this.getActiveWallet(), // TODO: Removing a linked wallet must ensure activeWallet is updated accordingly
        email: this.email,
        email_verified: false,
        // kyc
        kycIdNumber: this.kycDocument.number,
        kycIdType: this.kycDocument.type,
        kycIdIssueDate: this.kycDocument.issueDate,
        kycIdExpirationDate: this.kycDocument.expirationDate,
        kycFullName: this.kycDocument.fullName,
        kycBirthDate: this.kycDocument.birthDate,
        kycResidentialAddress: this.kycDocument.residentialAddress,
    };
};

UserAccountSchema.statics.findAccountById = async function (ctx, id, token) {
    // TODO: Fix this mess
    let UserAccount = mongoose.model("UserAccount");
    let account = await UserAccount.findById(id);
    if (!account) {
        account = new UserAccount({
            _id: id,
        });
        await account.save();
    }
    return account;
};

mongoose.model("UserAccount", UserAccountSchema);

export default {};
