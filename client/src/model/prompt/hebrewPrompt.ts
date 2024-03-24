import { ScriptGPT } from "../types/GPT";

const hebrewPrompt = (subject: string) => {
    return {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `create me a just a text for a podcast about this subject: ${subject}, for the ages of: 20, should take 5 minute podcast. write the answer in hebrew!!`,
            },
        ],
        temperature: 0.7,
    };
};

export default hebrewPrompt;
