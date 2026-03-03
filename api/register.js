const pool = require("./db");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {

  if (req.method !== "POST")
    return res.status(405).send("Only POST");

  const { fullname, username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {

    await pool.query(
      `INSERT INTO "user"(fullname,username,password)
       VALUES ($1,$2,$3)`,
      [fullname, username, hash]
    );

    res.json({ message: "Đăng ký thành công ✅" });

  } catch {
    res.json({ error: "Username đã tồn tại" });
  }
};