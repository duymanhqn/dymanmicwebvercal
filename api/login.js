import pool from "./db.js"

export default async function handler(req,res){

 if(req.method !== "POST"){
  return res.status(405).json({message:"Method not allowed"})
 }

 const {email,password} = req.body

 const result = await pool.query(
  'SELECT * FROM "user" WHERE email=$1',
  [email]
 )

 if(result.rows.length === 0){
  return res.json({message:"User not found"})
 }

 const user = result.rows[0]

 if(password !== user.password){
  return res.json({message:"Wrong password"})
 }

 res.json({message:"Login success"})
}