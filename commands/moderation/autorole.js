exports.run = async (client, message, args) => {
    const query = client.db;

    let res = await query(`SELECT * FROM autoassign WHERE guild_id = '${message.guild.id}'`)

    if(!args[0]) {
        if(!res[0]) return message.channel.send('There is not an auto assigned role set!');
        let role = message.guild.roles.get(res[0].role);
        if(!role) return message.channel.send('There is no auto assigned role set!');
        else return message.channel.send(`Current auto assigned role is: ${role.name}`);
    }

    if(args[0] == "clear") {
        if (res[0]) {
            if(res.role) await query.qrun(`DELETE FROM autoassign WHERE guild_id = '${message.guild.id}'`);
        }
        message.channel.send('Removed assignable role!');
    } else if (args[0] == "set"){
        let text = args.slice(1).join(' ');
        let w = '';

        let role = message.guild.roles.find(val => val.name.toLowerCase() === text.toLowerCase());
        if(!role) return message.channel.send('I cannot find this role!');
        if (!res[0]) text = `INSERT INTO autoassign (guild_id, role) VALUES('${message.guild.id}','${role.id}')`
        else if (res[0]) text = `UPDATE autoassign SET role= '${role.id}' WHERE guild_id='${message.guild.id}'`

        await query(text);
        message.channel.send(`Auto assignable has been set to '${role.name}'!`);
    }
}

exports.help = {
    name: "autorole",
    description: "Sets a role as auto assignable.",
    usage: "aar set [role]/ aar clear",
    aliases: ['aar'],
    permissions: 
    [
        'MANAGE_ROLES',
    ]}