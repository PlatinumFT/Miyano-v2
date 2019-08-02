const { Pool } = require('pg');
const pool = new Pool({
    user: 'tsukihi',
    host: 'localhost',
    database: 'tsukihi',
    password: 'tsukihi',
    port: 5432,
});

module.exports = async (q) => {
    const res = await pool.query(q);
    return res.rows
}
