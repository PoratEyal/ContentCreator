const imgPrompt = (script: string) => {
    return {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `data - ${script}. from this data i want you to create realistic image about this data. dont add words to the image`,
            },
        ],
        temperature: 0.7,
    };
};

export default imgPrompt;
