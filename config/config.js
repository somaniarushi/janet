const { Intents } = require('discord.js');

const { DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS } = Intents.FLAGS;

const botIntents = [DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS];


const commands = {
    hello: 'janet',
    what: 'what', // Sunsetting this for now
    food: 'food',
    help: 'help',
    music: 'music',
    response: 'response',
  };

  const prefix="?";

  module.exports = { botIntents, prefix, commands };