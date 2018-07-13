exports.run = async (client, message, args) => {
	const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
}

exports.help = {
    name: "ping",
    description: "Checks the ping of the bot to the server.",
    usage: "ping",
    aliases: ['p']
}