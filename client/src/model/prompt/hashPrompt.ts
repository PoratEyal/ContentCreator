const hashPrompt = (script: string) => {
    return {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `this is a script for a tiktok video: ${script}, give me the best hashtags for this video `,
            },
        ],
        temperature: 0.7,
    };
};

export default hashPrompt;
