module.exports = async (member, client) => {
    const query = client.db;

    let res = await query(`SELECT * FROM autoassign WHERE guild_id = '${member.guild.id}'`)
    if(!res[0]) return;

    let assignRole = member.guild.roles.find("id", res[0].role);
    if(!assignRole) return;

    member.addRole(assignRole, "Auto assigned role");
}