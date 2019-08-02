module.exports = async (message, text) => {
    let client = message.client;
    let query = client.db;

    myRole = message.guild.members.get(message.author.id).highestRole;
    botRole = message.guild.members.get(client.user.id).highestRole;

    if (await botRole.comparePositionTo(myRole) <= 0) return;
    
    let res = await query(`select * from filter where guild_id = '${message.guild.id}'`);
    if(!res[0]) return;

    let filtered = false;
    res.forEach(e => {
        if (filtered == true) return;
        if(text.toLowerCase() === e.phrase.toLowerCase() || (e.phrase.toLowerCase() == 'discord.gg' && text.toLowerCase().includes(e.phrase))) {
            message.delete();
            filtered = true;
            return message.channel.send(`${message.author}, you are not allowed to use a banned word/phrase.`)
        };
    });
}

