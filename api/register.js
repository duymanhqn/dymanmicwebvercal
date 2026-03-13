import pool from "./db.js"

export default async function handler(req, res) {

 if (req.method !== "POST") {
  return res.status(405).json({ message: "Method not allowed" })
 }

 const { username, email, password } = req.body

 await pool.query(
  'INSERT INTO "user" (username,email,password) VALUES ($1,$2,$3)',
  [username, email, password]
 )

 res.json({ message: "Register success" })
}