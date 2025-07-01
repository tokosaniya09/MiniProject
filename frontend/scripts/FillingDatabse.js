import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const SectionSchema = new mongoose.Schema({
    section_text: String,
    keywords_found: [String]
});

const Section = mongoose.model('Section', SectionSchema);

const filePath = "/Users/priyakeshri/Desktop/Sem 6/Mini Project/miniProjectfinal/MiniProject/Processing/SectionAndKeywords.txt";
const fileContent = fs.readFileSync(filePath, 'utf-8');

try {
    const sectionsData = JSON.parse(fileContent); 

    Section.insertMany(sectionsData)
        .then(() => {
            console.log("Data successfully inserted into MongoDB.");
            mongoose.connection.close();
        })
        .catch(err => console.error("Error inserting data:", err));

} catch (err) {
    console.error("Error parsing JSON file:", err);
}