import mongoose from 'mongoose';

const knowledgeSchema = new mongoose.Schema({
  section_text: { type: String, required: true },
  keywords_found: { type: [String], required: true },
  embedding: { type: [Number], default: [] }
});

export const KnowledgeBase = mongoose.model('KnowledgeBase', knowledgeSchema);
