// Get data from database

const { Pool } = require('pg');
const pool = new Pool({
    user: 'mibano',
    host: 'localhost',
    database: 'mibano',
    password: 'mibano',
    port: 5432,
});

module.exports = async (q) => {
    const res = await pool.query(q);
    return res.rows
}

module.exports.settings = async () => {
    const res = await pool.query(`select * from settings`);
    return res.rows[0];
}

module.exports.getXp = async (user, guild) => {
    const res = await pool.query(`SELECT * FROM xp WHERE (user_id = '${user}' AND guild_id = '${guild}')`);
    return res.rows[0];
}