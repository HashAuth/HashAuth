import mongoose from "mongoose";

import IdDocumentSchema from "./IdDocument.js";
import config from "../config/index.js";

let AccountSchema = new mongoose.Schema(
  {
    _id: { type: String },
    accountId: { type: String }, //band-aid for node-oidc-provider requirement
    nickname: { type: String },
    email: { type: String },
    kycDocument: IdDocumentSchema,
  },
  { timestamps: true }
);

AccountSchema.pre("save", function (next) {
  this.accountId = this._id;
  let IdDocument = mongoose.model("IdDocument");
  this.kycDocument = new IdDocument();
  next();
});

AccountSchema.methods.claims = async function (use, scope) {
  return {
    sub: this._id,
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

AccountSchema.statics.findAccountById = async function (ctx, id, token) {
  // TODO: Fix this mess
  let Account = mongoose.model("Account");
  let account = await Account.findById(id);
  if (!account) {
    account = new Account({
      _id: id,
    });
    await account.save();
  }
  return account;
};

mongoose.model("Account", AccountSchema);

export default {};
