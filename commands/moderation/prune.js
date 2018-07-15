exports.run = async (client, message, args) => {
    if (args[0]) {
        if(isNaN(args[0])) return message.channel.send(`Please use a valid number!`);
        const fetched = await message.channel.fetchMessages({limit: args[0]});
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`));
    } else if (!args[0]) {
        const fetched = await message.channel.fetchMessages({limit: 100});
        let botMessages = [];
        fetched.forEach(e => {
            if (e.author.id == client.user.id) botMessages.push(e);
            else return;
        })
        await message.channel.bulkDelete(botMessages)
            .catch(error => message.channel.send(`Error: ${error}`));

        setTimeout(function() {
            message.delete();
        }, 10000);
    }
}

exports.help = {
    name: "prune",
    description: "Prunes messages. No message will by default prune the bot.",
    usage: "prune",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}

