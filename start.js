const Discord = require('discord.js');
const client = new Discord.Client();
      client.db = require('./pgsql.js');

require('./util/eventLoader')(client);

run();

async function run() {
    let res = await client.db(`SELECT * FROM SETTINGS`);
    client.settings = res[0];
    client.login(client.settings.token);
}