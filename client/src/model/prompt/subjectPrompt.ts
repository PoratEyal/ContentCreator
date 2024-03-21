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
                content: `Your topic is ${bigSubject}. Provide 6 cool and creative subtopics for tiktok video related to ${bigSubject}. don't dive into details about them, just present a subtopics it self with no more info.`,
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
