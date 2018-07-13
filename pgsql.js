const { Pool } = require('pg');
const pool = new Pool({
    user: 'miyano',
    host: 'localhost',
    database: 'miyano',
    password: 'miyano',
    port: 5432,
});

module.exports = async (q) => {
    const res = await pool.query(q);
    return res.rows
}