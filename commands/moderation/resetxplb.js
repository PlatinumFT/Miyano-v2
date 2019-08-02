module.exports.run = async (client, message, args) => {
    let query = client.db
    try {
        await query(`delete from xp WHERE guild_id='${message.guild.id}'`);
        await message.channel.send(`Done!`);
    } catch(e) {
        console.error(e);
        await message.channel.send(`Failed...`);
    }
}

module.exports.help = {
    name: "resetxplb",
    description: "Resets the xp leaderboard for the guild.",
    usage: "resetxplb",
    type: "utility",
    permissions:
    [
        'MANAGE_ROLES',
    ]
}
