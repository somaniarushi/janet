const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.DISCORD_TOKEN,
});
const openai = new OpenAIApi(configuration);

async function getResponse(sentence) {
    prompt = "You: " + sentence + "\nResponse:";

    const response = await openai.createCompletion("text-davinci-001", {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
    });

    return response.data.choices[0].text;
}

module.exports = {getResponse};