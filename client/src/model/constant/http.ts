export const OpenAIUrl = "https://api.openai.com/v1/chat/completions";
export const DALLEUrl = "https://api.openai.com/v1/images/generations";
export const openAiheaders = {
    Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
    "Content-Type": "application/json",
};
