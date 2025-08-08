import mongoose from "mongoose";

let SumsubIdentificationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "UserAccount" },
        active: { type: Boolean, default: false },
        accessToken: { type: String, required: true },
        accessTokenExpiresOn: { type: Date },
    },
    { timestamps: true },
);

mongoose.model("SumsubIdentification", SumsubIdentificationSchema);

export default SumsubIdentificationSchema;
