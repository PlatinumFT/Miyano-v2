exports.run = async (client, message, args) => {
	const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
}

exports.help = {
    name: "ping",
    description: "Checks ping.",
    usage: "ping",
    aliases: ['p']
}