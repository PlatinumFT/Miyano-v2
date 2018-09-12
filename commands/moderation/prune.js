exports.run = async (client, message, args) => {




    if (args[0]) {
        let user = message.mentions.users.first() || client.users.get(args[0]);
        if(user) {
            let value=100;
            if(isNaN(args[1])) value = args[1];

            const fetched = await message.channel.fetchMessages({limit: value});
            await message.channel.bulkDelete(fetched.filter(m => m.author.id === user.id))
        } else {
            let value=100;
            if(isNaN(args[0])) value = args[0];

            const fetched = await message.channel.fetchMessages({limit: value});
            await message.channel.bulkDelete(fetched)
        }
    } else if (!args[0]) {
        const fetched = await message.channel.fetchMessages({limit: 100});
        

        if(fetched.size>1) {
            await message.channel.bulkDelete(fetched.filter(m => m.author.id === client.user.id))
        }

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

