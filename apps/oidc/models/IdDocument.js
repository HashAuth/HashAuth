import mongoose from "mongoose";

let IdDocumentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Driver's License", "Passport"],
      default: "Driver's License",
    },
    number: { type: String, default: "XXXXXXXXXXXXXXXXXXXXX" },
    issueDate: { type: String, default: "10/10/2022" },
    expirationDate: { type: String, default: "10/10/2027" },
    fullName: { type: String, default: "Jane Doe" },
    birthDate: { type: String, default: "May 5, 1995" },
    photo: { type: String },
    residentialAddress: {
      type: String,
      default: "123 Hedera Lane, HashGraph, USA 1337",
    },
  },
  { timestamps: true }
);

mongoose.model("IdDocument", IdDocumentSchema);

export default IdDocumentSchema;
