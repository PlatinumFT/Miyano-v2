module.exports.run = async (client, message, args) => {
    let settings = client.settings;
    let query = client.db;

    if(!args[0]) return;

    switch(args[0]) {
        case "xp":
            if(!args[1]) return await message.channel.send("Please specify a user!");
            if(!args[2]) return await message.channel.send("Please specify an amount!");
            if(isNaN(parseInt(args[2]))) return message.channel.send("Please specify a valid amount!");
            let res = await query(`select * from globalxp where user_id = '${args[1]}'`);
            if(!res[0]) return await message.channel.send("This user does not exist in the database!");

            await query(`UPDATE globalxp SET xp = ${parseInt(res[0].xp)+parseInt(args[2])} WHERE (user_id = '${args[1]}')`);
            return await message.channel.send(`Done!`);
    }
}

module.exports.help = {
    name: "user",
    description: "Alters a user globally",
    usage: "user [] <id>",
    type: "owner"
}