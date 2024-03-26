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
                content: `Provide 6 cool and creative subtopics for 10-20 years old related to ${bigSubject}. i want the subtopics will be Talking about things of our time and most important they need to be interesting and thought-provoking. return me them in json format. dont ever retuen me answer like this: {
                    "subjectList": ${bigSubject}
                  } return me everytime 6 subTopics and not 1!!!!`
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
