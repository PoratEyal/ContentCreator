const imgPrompt = (script: string) => {
    return {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `${script}. sum-up this text and make prompt for dall e model. add to the prompt thoes rules: 1.the image need to be only realistic image. 2.dont show words in the image. example: DALL-E prompt: Create an realistic image without words.........`,
            },
        ],
        temperature: 0.7,
    };
};

export default imgPrompt;
