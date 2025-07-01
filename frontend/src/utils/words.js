export const allPositiveWords = [
    "HOPE", "PEACE", "LOVE", "HAPPY", "SMILE", "FAITH", "BRAVE", "SHINE", "KIND", "GRACE",
    "TRUST", "HEART", "LUCK", "DREAM", "LIGHT", "CALM", "GLOW", "ENERGY", "BLOOM", "JOLLY",
    "BALANCE", "GENTLE", "UNITY", "JOY", "SOUL", "LAUGH", "BREATHE", "FOCUS", "STRONG", "CHARM",
    "BOLD", "PURE", "MOTIVE", "INSPIRE", "CARE", "ZEN", "SERENE", "FLOURISH", "HEAL", "SPARK",
    "CHEER", "WONDER", "BLESS", "THRIVE", "HARMONY", "GRATITUDE", "COURAGE", "KINDNESS", "BELIEVE", "HOORAY",
    "TRIUMPH", "NURTURE", "OPTIMISM", "STRENGTH", "CLARITY", "RADIATE", "SWEET", "JOYFUL", "COMPASSION", "HUGS",
    "MAGIC", "CELEBRATE", "MIRACLE", "POSITIVITY", "GROWTH", "HEARTY", "WISDOM", "GENEROUS", "FORGIVE", "SUPPORT",
    "CONFIDENCE", "GENTLENESS", "SYMPATHY", "APPRECIATE", "GOODNESS", "UPLIFT", "BRIGHT", "BEAUTY", "ZENITH", "PLAYFUL",
    "CUDDLE", "PEACEFUL", "HOPEFUL", "SMILING", "TENDER", "HUGGLE", "BLESSED", "ENCOURAGE", "PURITY", "CHERISH",
    "GRACEFUL", "BUBBLY", "NOBLE", "VICTOR", "VIBRANT", "FREEDOM", "SERENITY", "TRUSTED", "BEAM", "JOYFULNESS"
];

let recentlyUsedWords = [];

export function getRandomWords(count = 15) {
    let availableWords = allPositiveWords.filter(word => !recentlyUsedWords.includes(word));

    if (availableWords.length < count) {
        // Not enough new words left, reset recently used
        recentlyUsedWords = [];
        availableWords = [...allPositiveWords];
    }

    const shuffled = [...availableWords].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, count);

    recentlyUsedWords.push(...selectedWords);

    // Keep the recently used list not too long
    if (recentlyUsedWords.length > allPositiveWords.length / 2) {
        recentlyUsedWords = recentlyUsedWords.slice(-allPositiveWords.length / 2);
    }

    return selectedWords;
}
