const connect = require("../connect");

const login = async (req, res) => {
  const { username, password } = req.body;
//   console.log(username, password);
  const sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";

  try {
    const conn = await connect();
    conn.execute(sql, [username, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        console.log(result);
        return res.send(result);
      } else {
        console.log("wrong user or password");
        return res.status(401).send({ message: "wrong user or password" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports = { login };
