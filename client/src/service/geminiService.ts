import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APIKEY);

export async function getBardAnswer() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt2 = `
    {
        "messages": [{
            "role": "user",
            "content": "give me list of edtech startups companies. dont write anything before the {
                "messages": and dont write anything after the last }"
        }],
        "functions": [{
            "name": "get_startups_info",
            "parameters": {
                "type": "object",
                "properties": {
                    "companiesInfoList": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "string", "description": "company name"},
                                "description": {"type": "string", "description": "1 line description about the company"},
                                "recruitment": {"type": "string", "description": "amount of money of Last investment raising price"},
                                "value": {"type": "string", "description": "how much is the value of the company"},
                                "phase": {"type": "string", "description": "seed funding of the company. example: seed, serios A, serios B, serios C"},
                                "employees": {"type": "string", "description": "number of employees"},
                                "recruitmentDate": {"type": "string", "description": "date of Last investment raising price formated like this: dd/mm/yyyy"},
                                "logo": {"type": "string", "description": "url of company logo"}
                            }
                        }
                    }
                }
            }
        }]
    }
    `;

    const prompt = `give me a list of 20 newest edtech companies like this -
    name - company name,
    description - 1 line description about the company,
    recruitment - amount of money of Last investment raising price,
    value - how much is the value of the company,
    phase - seed funding of the company. example: seed, series A, series B, series C,
    employees - number of employees,
    recruitmentDate - date of Last investment raising price formatted like this: dd/mm/yyyy,
    logo - URL of company logo`;  

    const prompt3 = 'give me data about the war in israel right now'

    const prompt4 = 'You are an expert in writing learning paths in different fields for children. Your goal is to write a learning path that is pedagogically adapted for children at the age of 8 in Israel.The path is learned independently, for 5 days, each day for about an hour and a half.Its goal is to empower independent learning, creativity, and critical thinking. The course should work on the following skills: independent learning, creativity, technological literacy, and critical thinking.On the third day, there is a class meeting for half an hour, and on the fifth and final day, there is a class meeting for an hour.You need to build a template of 5 days, with each day having a title, goal (one or two sentences), and headings of the tasks on that day (3-4 tasks). very important to add dali e, chatGpt or gemini to one task per day! (remember that the children at the age of 8 so dont give then something hard). (if you offer videos add link for that) On the fourth day, there is a task dedicated to preparing the learning presentation in front of the entire class. Your topic is Voyage in a spaceship.The path should teach students to understand What way does the spaceship travel in space, the difficulties inside the spaceship, the living conditions inside it, and create a product (give me ideas for types of products in the context of this project. For example: list, poster, creating an image with an artificial intelligence tool, etc.).During the course, there is no teaching, the students need to understand concepts and acquire knowledge independently through experimentation.Each day should include practical, active work. dont suggest to watch video or install some apps. dont suggest to upload text files beacuse the children have a textbox. Use simple words that children know. Use words that 8 year olds understand. build missions that 8 years old children can do. Pay attention to the instructions of the tasks.Emphasize that the tasks will not be similar. write the answer in hebrew'

    const result = await model.generateContent(prompt4);
    const response = await result.response;
    const text = await response.text();
    console.log(text)

    // const parsedResponse = JSON.parse(text);
    // const companiesInfoList = parsedResponse.messages;
    // console.log(companiesInfoList);
}
