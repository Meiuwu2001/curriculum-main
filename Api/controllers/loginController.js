const connect = require("../connect");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, contrasena } = req.body;

  try {
    const conn = await connect();
    const sql = "SELECT * FROM usuarios WHERE username = ? AND contrasena = ?";

    const result = await conn.query(sql, [username, contrasena]);
    console.log(result[0]);
    const data = result[0];
    if (data.length > 0) {
      const token =jwt.sign({username}, "Stack",{
        expiresIn: '3m'
      })
      console.log("Usuario autenticado:", username);
      return res.send({ token });
    } else {
      console.log("Usuario o contraseña incorrectos");
      return res
        .status(401)
        .send({ message: "Usuario o contraseña incorrectos" });
    }
  } catch (err) {
    console.error("Error al autenticar:", err);
    return res.status(500).send({ message: "Error al autenticar" });
  }
};

module.exports = { login };
