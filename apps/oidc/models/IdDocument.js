import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

import config from "../config/index.js";

let IdDocumentSchema = new mongoose.Schema(
    {
        placeholder: { type: Boolean, default: true },
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
    { timestamps: true },
);

IdDocumentSchema.plugin(fieldEncryption, {
    fields: ["number", "fullName", "birthDate", "residentialAddress"],
    secret: config.DB_ENCRYPTION_KEY,
});

mongoose.model("IdDocument", IdDocumentSchema);

export default IdDocumentSchema;
