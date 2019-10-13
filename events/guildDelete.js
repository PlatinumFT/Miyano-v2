module.exports = async (guild, client) => {
    if(guild.available === false) return;
    let owner = await client.users.get(client.settings.owner_id);
    await owner.send(`📤\nI have left server *\`${guild.name}\`*!\n・Owner: \`${guild.owner.user.username}#${guild.owner.user.discriminator}\`\n・Users: \`${guild.memberCount}\``);
}