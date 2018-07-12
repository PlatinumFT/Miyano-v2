const Discord = require('discord.js');
const client = new Discord.Client();
client.settings = require('./settings.json');

require('./util/eventLoader')(client);

client.login(client.settings.token);