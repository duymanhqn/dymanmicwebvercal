const { Pool } = require("pg");

const connectionString = process.env.POSTGRES_URL;

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    })
  : new Pool({
      host: "localhost",
      port: 5433,
      user: "postgres",
      password: "123456",
      database: "test_db"
    });

module.exports = pool;