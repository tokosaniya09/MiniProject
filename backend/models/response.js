// writing the schema of our model

import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  userId: String,
  responses: [{ imageId: String, answer: String, points: Number }],
  totalPoints: Number,
  mood: String,
  timestamp: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", ResponseSchema);

export default Response;
