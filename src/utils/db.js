const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "npixNuyTgHdNP5bc",
  host: "db.bavhvxjuaanvtyoppmey.supabase.co",
  port: 5432,
  database: "postgres",
});

module.exports = pool;
