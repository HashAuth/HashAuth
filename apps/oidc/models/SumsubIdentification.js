import mongoose from "mongoose";

let SumsubIdentificationSchema = new mongoose.Schema({}, { timestamps: true });

mongoose.model("SumsubIdentification", SumsubIdentificationSchema);

export default SumsubIdentificationSchema;
