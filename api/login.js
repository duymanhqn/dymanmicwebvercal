const pool = require("./db");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {

  if (req.method !== "POST")
    return res.status(405).send("Only POST");

  const { username, password } = req.body;

  const result = await pool.query(
    `SELECT * FROM "user" WHERE username=$1`,
    [username]
  );

  if (result.rows.length === 0)
    return res.json({ error: "Không tồn tại user" });

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.json({ error: "Sai mật khẩu" });

  res.json({
    message: "Login thành công 🎉",
    user: user.username
  });
};