import { Schema, model } from 'mongoose';

const SectionSchema = new Schema({
  section_text: {
    type: String,
    required: true,
  },
  keywords_found: {
    type: [String],
    required: true,
  },
  embedding: {
    type: [Number],
    required: true,
  },
}, {
  timestamps: true, // optional, adds createdAt and updatedAt
});

const Section = model('Section', SectionSchema);

export default Section;