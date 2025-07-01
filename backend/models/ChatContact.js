import mongoose from 'mongoose'

const chatContactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

export default mongoose.models.ChatContact || mongoose.model('ChatContact', chatContactSchema)
