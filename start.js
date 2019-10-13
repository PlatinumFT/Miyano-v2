const Discord = require('discord.js');
const client = new Discord.Client();
      client.db = require('./pgsql.js');
      client.globalxp = {};
      client.xp = {};
      client.findColour = require('./util/colourFinder.js');
      client.findUser = require('./util/userFinder.js');

require('./util/eventLoader')(client);

run();

async function run() {
    client.settings = await client.db.settings();
    client.login(client.settings.token);
}