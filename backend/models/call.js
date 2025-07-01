const mongoose = require('mongoose');
const { Schema, models, model } = mongoose;
const callSchema = new Schema({

    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    volunteerId: { 
        type: Schema.Types.ObjectId, 
        ref: "Volunteer", 
        required: true 
    },
    time: { 
        type: Date, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "confirmed", "completed", "cancelled"], 
        default: "pending" 
    },
    roomUrl: {
        type: String,
        required: false,
    },
    reason: {
        type: String,
        required: false,
    }
}, { timestamps: true });

callSchema.index({ volunteerId: 1, time: 1 });

const Call = models.Call || model("Call", callSchema);

module.exports = Call;
