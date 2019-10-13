module.exports = async message => {
    let client = message.client,
        query = client.db,
        xp = client.xp,
        globalxp = client.globalxp;

    let res = await query(`SELECT * from ignorexp WHERE(guild_id = '${message.guild.id}' AND channel_id = '${message.channel.id}')`);
    if (res[0]) return;

    let amount = Math.floor(Math.random() * (30 - 10 + 1) + 10);

    if (!xp[message.guild.id]) xp[message.guild.id] = {};

    // Xp
    if (!xp[message.guild.id][message.author.id]) {
        xp[message.guild.id][message.author.id] = { cooldown: new Date() }
        runXp(message, amount);
    }

    if ((((new Date() - xp[message.guild.id][message.author.id].cooldown) / 1000) > 60)) {
        runXp(message, amount);
        xp[message.guild.id][message.author.id] = { cooldown: new Date() }
    }

    // Global xp
    if (!globalxp[message.author.id]) {
        globalxp[message.author.id] = { cooldown: new Date() }
        runGlobalXp(message, amount);
    }

    if ((((new Date() - globalxp[message.author.id].cooldown) / 1000) > 60)) {
        runGlobalXp(message, amount);
        globalxp[message.author.id] = { cooldown: new Date() }
    }
}

async function runXp(message, into) {
    let res = await message.client.db.getXp(message.author.id, message.guild.id),
        query = '';

    if (res) {
        query = `INSERT INTO xp(guild_id, user_id, xp) VALUES ('${message.guild.id}','${message.author.id}',${into})`;
    } else {
        xp = parseInt(res.xp);
        query = `UPDATE xp SET xp = ${xp + into} WHERE (guild_id = '${message.guild.id}' AND user_id = '${message.author.id}')`;
    }

    await message.client.db(query);
}

async function runGlobalXp(message, into) {
    let res = await message.client.db(`SELECT * FROM users WHERE (user_id = '${message.author.id}')`),
        query = '';

    if (res.length == 0) {
        query = `INSERT INTO users(user_id, xp) VALUES ('${message.author.id}',${into})`;
    } else {
        xp = parseInt(res[0].xp);
        query = `UPDATE users SET xp = ${xp + into} WHERE (user_id = '${message.author.id}')`;
    }

    await message.client.db(query);
}