import axios from "axios";

export const OpenAIUrl = "https://api.openai.com/v1/chat/completions";
export const DALLEUrl = "https://api.openai.com/v1/images/generations";
export const openAiheaders = {
    Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
    "Content-Type": "application/json",
};

// subject section - - - - - - - - - - - - - - - - - -  - - - - -

export const subjectsPrompt = {
    model: "gpt-4",
    messages: [
        {
            role: "user",
            content: "give me 12 intersting, exciting and enjoyable subjects for TikTok videos.",
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
export const requestOptions = {
    method: "post",
    url: OpenAIUrl,
    data: subjectsPrompt,
    headers: openAiheaders,
};
export async function getSubjects() {
    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        const subjectListString = responseData?.choices?.[0]?.message?.function_call?.arguments;
        const subjectList = JSON.parse(subjectListString);
        return subjectList;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// script section - - - - - - - - - - - - - - - - - -  - - - - -

export async function getScript(time: string, age: string, subject: string) {
    const scriptPrompt = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `create me a just a text for a TikTok video on this subject: ${subject}, for the ages of: ${age}, and the video should be ${time} seconds. just give me the script text and that it!. dont give text before the script and after the script. dont give me the background music, dont give who is saying the text. dont show the time! dont write: start at the begining and: end in the end. only the text of the script and thats it!`,
            },
        ],
        temperature: 0.7,
    };

    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: scriptPrompt,
        headers: openAiheaders,
    };

    try {
        const responseData = (await axios(requestOptions)).data.choices[0].message.content;
        return responseData;
    } catch (error) {
        throw error;
    }
}

// Hashtags section - - - - - - - - - - - - - - - - - -  - - - - -

export async function getHashtags(script: string) {
    const scriptPrompt = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `this is a script for a tiktok video: ${script}, give me the best hashtags for this video `,
            },
        ],
        temperature: 0.7,
    };

    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: scriptPrompt,
        headers: openAiheaders,
    };

    try {
        const responseData = (await axios(requestOptions)).data.choices[0].message.content;
        return responseData;
    } catch (error) {
        throw error;
    }
}

// return 3 prompts to the image genaration prompt - - - - - - - - - - - - - - - - - -  - - - - -

export async function promptToImg(script: string) {
    const scriptPrompt = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `${script}. sum-up this text and make prompt for dall e model. add to the prompt thoes rules: 1.the image need to be only realistic image. 2.dont show words in the image. example: DALL-E prompt: Create an realistic image without words.........`,
            },
        ],
        temperature: 0.7,
    };

    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: scriptPrompt,
        headers: openAiheaders,
    };

    try {
        const responseData = (await axios(requestOptions)).data.choices[0].message.content;
        return responseData;
    } catch (error) {
        throw error;
    }
}

// images section - - - - - - - - - - - - - - - - - -  - - - - -

export async function getImage(script: string) {
    const requestOptions = {
        method: "POST",
        url: "https://api.openai.com/v1/images/generations",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
        },
        data: {
            model: "dall-e-3",
            prompt: script,
            n: 1,
            size: "1024x1024",
        },
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error("Error fetching image:", error);
        throw error;
    }
}


// hebrew script section - - - - - - - - - - - - - - - - - -  - - - - -

export async function getHebrewPodcast(time: string, age: string, subject: string) {
    const scriptPrompt = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `create me a just a text for a podcast about this subject: ${subject}, for the ages of: ${age}, and the video should be ${time} seconds. just give me the text and that it!. dont give text before the script and after the script. dont give me the background music, dont give who is saying the text. dont show the time! dont write: start at the begining and: end in the end. only the text of the script and thats it!, write the answer in hebrew!!`,
            },
        ],
        temperature: 0.7,
    };

    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: scriptPrompt,
        headers: openAiheaders,
    };

    try {
        const responseData = (await axios(requestOptions)).data.choices[0].message.content;
        return responseData;
    } catch (error) {
        throw error;
    }
}
