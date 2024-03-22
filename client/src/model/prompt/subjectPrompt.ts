const subjectsPrompt = {
    model: "gpt-4",
    messages: [
        {
            role: "user",
            content: "give me 6 intersting subjects for TikTok videos.",
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
                content: `Your topic is ${bigSubject}. Provide 6 cool and creative subtopics for TikTok videos related to ${bigSubject}. Don't dive into details about them; just present the subtopics themselves with no more info.`,
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
    }
};


export { subjectsPrompt, tinySubjectPrompt };
