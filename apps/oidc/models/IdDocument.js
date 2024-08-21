import mongoose from "mongoose";

import config from "../config/index.js";

let IdDocumentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Driver's License", "Passport"],
    },
    number: { type: String },
    issueDate: { type: String },
    expirationDate: { type: String },
    fullName: { type: String },
    birthDate: { type: String },
    photo: { type: String },
    residentialAddress: { type: String },
  },
  { timestamps: true }
);

mongoose.model("IdDocument", IdDocumentSchema);

export default IdDocumentSchema;
