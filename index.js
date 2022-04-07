const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands, prefix } = require('./config/config');
const { handleResponse, handleHello, handleFood, handleHelp, handleError } = require('./src/command');
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
    // if message by bot, do nothing
    if (msg.author.bot) return;
    // do nothing if command is not preceded with prefix
    if (!msg.content.startsWith(prefix)) return;

    // remove prefix from command — here, it's ?
    const userCmd = msg.content.slice(prefix.length);


    if (userCmd.includes(commands.hello)) handleHello(msg);
    else if(userCmd.includes(commands.food)) handleFood(msg, userCmd);
    else if(userCmd.includes(commands.help)) handleHelp(msg);
    else if(userCmd.includes(commands.response)) handleResponse(msg, userCmd);
    else handleError(msg);
  });

  const startBot = () => {
    client.login('OTA1OTY5MjEzNDczMTc3Njcx.YYRzlA.-bxHf0k9CWelsir7asgLtqDJXn8');
  };

  // export startBot as default
  module.exports = { startBot };