module.exports.run = async (client, message, args) => {
    let query = client.db;
    let settings = client.settings;
    let blacklist = client.blacklist;
    let res;
    if(!args[0]) return message.channel.send("Please specify an ID!");
    res = await query(`select * from blacklist where user_id = '${args[0]}'`);
    if(!res[0]) {
        await query(`insert into blacklist values ('${args[0]}')`);
        return await message.channel.send(`Added ${args[0]} to the blacklist.`);
        blacklist.push(args[0])
    } else {
        await query(`delete from blacklist where user_id = '${args[0]}'`);
        let index = blacklist.indexOf(args[0]);
        blacklist.splice(index, 1);
        return await message.channel.send(`Removed ${args[0]} from the blacklist.`);
    }

}

module.exports.help = {
    name: "blacklist",
    description: "",
    usage: "",
    type: "owner"
}
