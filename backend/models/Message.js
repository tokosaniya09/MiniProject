import { Schema, models, model } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Message = models.Message || model("Message", messageSchema);
export default Message;
