const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});
const openai = new OpenAIApi(configuration);

async function getResponse(sentence) {
    prompt = "You: " + sentence + "\nResponse:";
    // console.log(prompt);

    const response = await openai.createCompletion("text-davinci-001", {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
    });
    // console.log(response.data.choices[0].text);
    return response.data.choices[0].text;
}

module.exports = {getResponse};