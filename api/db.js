import pkg from "pg"
const { Pool } = pkg

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:123456@localhost:5433/test_db"
})

export default pool