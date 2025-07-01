import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // expires after 10 minutes
    },
});

export default mongoose.models.EmailVerification || mongoose.model("EmailVerification", emailVerificationSchema);
