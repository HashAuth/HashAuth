import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

import config from "../config/index.js";

let SumsubIdentificationSchema = new mongoose.Schema(
    {
        accessToken: { type: String },
        accessTokenExpiresOn: { type: Date },
        reviewStatus: { type: String },
        reviewAnswer: { type: String },

        firstName: { type: String },
        lastName: { type: String },
        aliasName: { type: String },
        dob: { type: String },
        country: { type: String },

        idDocs: [{ type: mongoose.Schema.Types.Mixed }],
    },
    { timestamps: true },
);

SumsubIdentificationSchema.plugin(fieldEncryption, {
    fields: ["firstName", "lastName", "aliasName", "dob", "country", "idDocs"],
    secret: config.DB_ENCRYPTION_KEY,
});

mongoose.model("SumsubIdentification", SumsubIdentificationSchema);

export default SumsubIdentificationSchema;
