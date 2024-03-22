import { ScriptGPT } from "../types/GPT";

const scriptPrompt = (script: ScriptGPT) => {
    const { videoSubject, time } = script;
    return {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `create me a just a text for a TikTok video on this subject: ${videoSubject}, for the ages of: 20, and the video should be ${time} seconds. just give me the script text and that it!. dont give text before the script and after the script. dont give me the background music, dont give who is saying the text. dont show the time! dont write: start at the begining and: end in the end. only the text of the script and thats it!`,
            },
        ],
        temperature: 0.7,
    };
};

export default scriptPrompt;
