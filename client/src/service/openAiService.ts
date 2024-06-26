import axios from "axios";
import { OpenAIUrl, openAiheaders } from "../model/constant/http";
import { subjectsPrompt, tinySubjectPrompt } from "../model/prompt/subjectPrompt";
import scriptPrompt from "../model/prompt/scriptPrompt";
import { ScriptGPT } from "../model/types/GPT";
import hashPrompt from "../model/prompt/hashPrompt";
import imgPrompt from "../model/prompt/imgPrompt";
import hebrewPrompt from "../model/prompt/hebrewPrompt";

// subject section - - - - - - - - - - - - - - - - - -  - - - - -

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


// tiny subject section - - - - - - - - - - - - - - - - - -  - - - - -


export async function getTinySubjects(bigSubject: string) {
    const requestOptionsTiny = {
        method: "post",
        url: OpenAIUrl,
        data: tinySubjectPrompt(bigSubject),
        headers: openAiheaders,
    };
    
    try {
        const response = await axios(requestOptionsTiny);
        const responseData = response.data;
        const subjectListString = responseData?.choices?.[0]?.message?.function_call?.arguments;
        
        const subjectList = JSON.parse(subjectListString);

        if (subjectList.subjectList.length > 5) {
            return subjectList; // Return the list if it contains more than one subject
        } else {
            console.log("Received only one subject, trying again...");
            return await getTinySubjects(bigSubject); // Recursive call until the condition is met
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// script section - - - - - - - - - - - - - - - - - -  - - - - -

export async function getScript(script: ScriptGPT) {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: scriptPrompt(script),
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
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: hashPrompt(script),
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
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: imgPrompt(script),
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

export async function getHebrewPodcast(subject: string) {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: hebrewPrompt(subject),
        headers: openAiheaders,
    };

    try {
        const responseData = (await axios(requestOptions)).data.choices[0].message.content;
        return responseData;
    } catch (error) {
        throw error;
    }
}
