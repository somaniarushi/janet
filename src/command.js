const { getResponse } = require('./gen_sentence');
const {  commands } = require('../config/config');
const axios = require('axios');

async function handleResponse(msg, userCmd) {
    let prev_messages = await fewShotGenerator(msg);
    let prompt = userCmd.replace(commands.response, '');
    let response = await getResponse(prompt);
    msg.channel.send(response);
  }

async function fewShotGenerator(msg) {
    let messages = await msg.channel.messages.fetch({ limit: 100 });
    let asker = msg.author;
    let prev_messages = [];

    return prev_messages.join("\n");

}

function handleHello(msg) {
    msg.channel.send('Hi, there!');
  }

async function handleFood(msg, userCmd) {
    let prompt = userCmd.replace(commands.food, '');
    let res = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {'Authorization': `Bearer ${process.env.YELP_TOKEN}`},
      params: {'location': 'berkeley', 'open_now': true, 'term': prompt}
    });

    let restaurants = res.data.businesses;

    const place = restaurants[Math.floor(Math.random()*restaurants.length)];
    console.log(place);
    const categories = place.categories.map((e) => (e.alias))
    msg.channel.send(`I've analysed ${Math.floor(Math.random()*1000000)} meal decisions you've made and decided that you should get **${place.name}**. They're at ${place.location.address1}, have a rating of ${place.rating}/5 and serve ${categories.join(" and ")}.`);
  }

  function handleHelp(msg) {
    msg.channel.send(`
Hello, there! Here's Janet commands:
\`?food\` — Suggest a restaurant in Berkeley! Add terms to narrow the results, like "thai" or "icecream"
\`?response\` — Ask Janet a question and she'll respond with a short answer.
\`?janet\` — Say hi to Janet!

Is Janet offline? Sorry about that, monetary constraints. Click on https://janet-girl-bot.herokuapp.com/ to wake her up.
`);
  }

  function handleError(msg) {
    msg.author.send('Sorry, I don\'t understand that command. Try `?help` for a list of commands.');
  }

module.exports = { handleResponse, handleHello, handleFood, handleHelp, handleError };