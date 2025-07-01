import { readFile, writeFile } from 'fs/promises';

const stopwords = new Set([
    "a", "an", "the", "about", "above", "across", "after", "against", "along", "among", "around", "as", "at",
    "before", "behind", "below", "beneath", "beside", "between", "beyond", "by", "down", "during", "except", "for",
    "from", "in", "inside", "into", "like", "near", "of", "off", "on", "onto", "out", "outside", "over", "past",
    "since", "through", "throughout", "to", "toward", "under", "underneath", "until", "up", "upon", "with", "within",
    "without", "and", "or", "but", "nor", "yet", "so", "although", "because", "since", "unless", "while", "whereas",
    "either", "neither", "both", "whether", "i", "me", "you", "he", "she", "it", "we", "us", "they", "them", "myself",
    "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves", "mine", "yours", "his", "hers",
    "theirs", "ours", "whose", "this", "that", "these", "those", "which", "who", "whom", "what", "whatever", "whoever",
    "am", "is", "are", "was", "were", "be", "being", "been", "have", "has", "had", "do", "does", "did", "can", "could",
    "shall", "should", "will", "would", "may", "might", "must", "ought", "here", "there", "then", "now", "very", "too",
    "also", "just", "only", "even", "rather", "quite", "somewhat", "such", "almost", "already", "much", "more", "most",
    "less", "least", "iiiv", "v", "ii", "vi", "vivv","your", "if", "their", "ies", "not", "ing", "own", "how", "my", "her"
    , "his", "them", "when", "why", "who", "whose", "how", "whom", "where", "first", "once", "twice", "than", "any", "ebook"
    , "cengage", "pm", "copyright", "learning", "all", "rights", "reserved", "copied", "scanned", "duplicated", "whole","part",
    "due", "electronic", "some","third","party","content","suppressed","andor","echapter","s","editorial","review","deemed",
    "any","suppressed","content","materially","affect","overall","learning","experience","reserves","right","remove","additional",
    "content","time","subsequent","restrictions","require","ViVVown"
]);

async function filterKeywords() {
    try {
        const data = await readFile('/Users/priyakeshri/Desktop/Sem 6/Mini Project/miniProjectfinal/MiniProject/Processing/Trial 2/results/processed_text.txt', 'utf8');
        let jsonData = JSON.parse(data);
        
        if (Array.isArray(jsonData)) {
            jsonData.forEach((item, index) => {
                if (Array.isArray(item.keywords_found)) {
                    const originalCount = item.keywords_found.length;
                    item.keywords_found = item.keywords_found.filter(word => {
                        return !stopwords.has(word.trim().toLowerCase());
                    });
                    console.log(`Entry ${index}: Filtered out ${originalCount - item.keywords_found.length} stopwords.`);
                } else {
                    console.warn(`Entry ${index} does not have 'keywords_found' as an array.`);
                }
            });
        } else if (jsonData && Array.isArray(jsonData.keywords_found)) {
            const originalCount = jsonData.keywords_found.length;
            jsonData.keywords_found = jsonData.keywords_found.filter(word => !stopwords.has(word.trim().toLowerCase()));
            console.log(`Filtered out ${originalCount - jsonData.keywords_found.length} stopwords.`);
        } else {
            console.warn("'keywords_found' is not an array or doesn't exist in the JSON.");
        }
        
        await writeFile('/Users/priyakeshri/Desktop/Sem 6/Mini Project/miniProjectfinal/MiniProject/Processing/SectionAndKeywords.txt', JSON.stringify(jsonData, null, 4), 'utf8');
        console.log('Filtered dictionary saved to SectionAndKeywords.txt');
    } catch (error) {
        console.error('Error:', error);
    }
}

filterKeywords();
