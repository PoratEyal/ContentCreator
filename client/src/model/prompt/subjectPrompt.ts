const subjectsPrompt = {
    model: "gpt-4",
    messages: [
        {
            role: "user",
            content: "give me 6 diverse topics.",
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
                content: `Provide 6 cool and creative subtopics for 10-20 years old related to ${bigSubject}. i want the subtopics will be intersting and Talking about things of our time. return me them in json format. dont return me {"subjectList": ["${bigSubject}"]}'}. example: if this football is your topic: the answer will be: History of Football, Rules and Regulations, Major Football Tournaments, Football Clubs and Teams...`
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
