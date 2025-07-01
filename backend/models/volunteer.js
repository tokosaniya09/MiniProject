import { Schema, models, model } from "mongoose";

const volunteerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    problem: {
        type: [String],
        required: true
    },
    chatCnt: {
        type: Number,
        default: 0
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Cascade delete calls when volunteer is deleted
volunteerSchema.pre("findOneAndDelete", async function (next) {
    const volunteer = await this.model.findOne(this.getFilter());
    if (volunteer) {
        const Call = (await import("./call.js")).default;
        await Call.deleteMany({ volunteerId: volunteer._id });
    }
    next();
});

const Volunteer = models.Volunteer || model("Volunteer", volunteerSchema);
export default Volunteer;
