module.exports = async client => {
    console.log(`${client.user.username} has started`)
    console.log(` Users: ` + `${client.users.size}`)
    console.log(` Channels: ` + `${client.channels.size}`)
    console.log(` Guilds: ` + `${client.guilds.size}`)

    if(client.user.username != 'Mibano') {
        let owner = await client.users.get(client.settings.owner_id);
        owner.send('I have started!');    
    }

    require('../util/commandsLoader.js')(client);
}