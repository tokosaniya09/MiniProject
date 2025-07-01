import fs from 'fs';
import pdf from 'pdf-parse';
import dotenv from 'dotenv'

dotenv.config();

const pdfPath = "/Users/priyakeshri/Desktop/Recent/Projects/Mini Project/Gerald Corey - Theory and Practice of Counseling and Psychotherapy-Brooks Cole (2016).pdf";
const outputPath = "/Users/priyakeshri/Desktop/Sem 6/Mini Project/miniProjectfinal/MiniProject/extracted_text.txt";

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(async function (data) {
    const rawText = data.text;
    const chunks = splitTextIntoChunks(rawText);

    let textToSave = "";
    
    for (const chunk of chunks) {
        textToSave += `Chapter: ${chunk.chapter}\n`;
        textToSave += `${chunk.section}\n\n`;
        textToSave += `${chunk.text}\n\n`;
    }

    fs.writeFileSync(outputPath, textToSave);
    console.log("Book text saved to", outputPath);
});

function splitTextIntoChunks(text) {
    const sections = text.split("\n\n");
    let currentChapter = "Unknown";
    let structuredChunks = [];

    const chapterRegex = /(CHAPTER\s+\d+[:.-]?\s*([A-Za-z\s]+))/i; // Detects "CHAPTER 1: XYZ"
    
    for (const section of sections) {
        const trimmedSection = section.trim();

        const chapterMatch = trimmedSection.match(chapterRegex);
        if (chapterMatch) {
            currentChapter = chapterMatch[1]; 
            continue;
        }

        structuredChunks.push({
            chapter: currentChapter,
            section: `Section ${structuredChunks.length + 1}`,
            text: trimmedSection
        });
    }

    return structuredChunks;
}
