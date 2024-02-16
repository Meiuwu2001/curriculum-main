const connect = require("../connect");

const getAllPing = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM usuarios");
    console.log(rows);
    res.send(rows);
  };

  module.exports = { getAllPing };