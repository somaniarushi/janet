const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands, prefix } = require('./config/config');
const { getResponse } = require('./src/gen_sentence');
// const config = require('./config/default');

const axios = require('axios');

const client = new Client({
  intents: botIntents,
  partials: ['CHANNEL', 'MESSAGE'],
});

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return; // do nothing if command is not preceded with prefix

    const userCmd = msg.content.slice(prefix.length);

    console.log(userCmd);

    if (userCmd == commands.hello) {
        msg.channel.send('Hi, there!');
    }
    else if(userCmd.includes(commands.food)) {

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
    else if(userCmd == commands.help) {
      msg.channel.send('Hello, there! Ask Janet for food recommendations using the `?food` command, music reccs using `?music`, for help through `?help`, and say hi by typing `?janet`');
    }
    else if(userCmd == commands.music) {
      msg.channel.send('Looking for music now!')
    }
    else if(userCmd.includes(commands.response)) {
      let prompt = userCmd.replace(commands.response, '');
      let response = await getResponse(prompt);
      msg.channel.send(response);
    }
  });

  const startBot = () => {
    client.login(process.env.DISCORD_TOKEN);
  };

  // export startBot as default
  module.exports = { startBot };