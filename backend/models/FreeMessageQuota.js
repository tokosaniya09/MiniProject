import { Schema, model, models } from 'mongoose';

const freeMessageQuota = new Schema({
    senderId: {
        type: String, 
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    remainingMessages: {
        type: Number, 
        required: true, 
        default: 10,
    }
}, { timeStamps: true });

export default models.FreeMessageQuota || model('FreeMessageQuota', freeMessageQuota);