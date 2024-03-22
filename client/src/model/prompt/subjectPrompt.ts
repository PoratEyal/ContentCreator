const subjectsPrompt = {
    model: "gpt-4",
    messages: [
        {
            role: "user",
            content: "give me 6 intersting, exciting and enjoyable subjects for TikTok videos.",
        },
    ],
    temperature: 0.7,
    functions: [
        {
            name: "generate_subjects",
            parameters: {
                type: "object",
                properties: {
                    subjectList: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
            },
        },
    ],
};

const tinySubjectPrompt = (bigSubject: string) => {
    return {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `Your topic is ${bigSubject}. Provide 6 cool and creative subtopics for TikTok videos related to ${bigSubject}. Don't dive into details about them; just present the subtopics themselves with no more info. For example, if the topic were 'Astronomy', you might suggest:
1. Navigating the night sky: Constellation basics
2. Space food: What astronauts eat
3. Black holes: Nature's mysterious vacuums
4. The race to Mars: Future missions and dreams
5. Meteor showers: When to watch them
6. The history of telescopes: From Galileo to now.`,
            },
        ],
        temperature: 0.7,
        functions: [
            {
                name: "generate_subjects",
                parameters: {
                    type: "object",
                    properties: {
                        subjectList: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                },
            },
        ],
    };
};


export { subjectsPrompt, tinySubjectPrompt };
