const imgPrompt = (dataDescription: string) => {
    return {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `I have data described as follows: "${dataDescription}". Based on this description, generate a realistic image that visually represents this data. The image should be highly detailed and aim for photorealism. Please ensure no text or words are included in the image, focusing solely on the visual representation of the data.`,
            },
        ],
        temperature: 0.7,
    };
};

export default imgPrompt;
