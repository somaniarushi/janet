const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands, prefix } = require('./config/config');
// const config = require('./config/default');

const axios = require('axios');

const foodType = [
  "italian",
  "mexican",
  "korean",
  "ramen",
  "chinese",
  "indian",
  "thai",
  "Taco Bell",
  "Chipotle",
  "Boba Ninja",
  "salad",
  "McDonalds",
  "Racha's Cafe",
  "Kimchi Garden",
  "starve :)"
]

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
    else if(userCmd == commands.food) {
        const random = foodType[Math.floor(Math.random()*foodType.length)];
        msg.channel.send(`I've analysed ${Math.floor(Math.random()*1000000)} meal decisions you've made and decided that you should get **${random}**.`);
    }
    else if(userCmd == commands.help) {
      msg.channel.send('Hello, there! Ask Janet for food recommendations using the `?food` command, for help through `?help`, and say hi by typing `?janet`');
    }
    else {
      msg.author.send("Hey, there! Janet here :)\nI know every thing there is to know in the known universe, but I don't know how give you an answer to your question. \nSorry! :(");
    }
  });

  const startBot = () => {
    client.login(process.env.DISCORD_TOKEN);
  };

  // export startBot as default
  module.exports = { startBot };