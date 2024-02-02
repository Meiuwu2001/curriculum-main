const connect = require("../connect");



const getAllPersona = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM persona");
    console.log(rows);
    res.send(rows);
  };
  const getOnePersona = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM persona WHERE id = ?", [
      req.params.id,
    ]);
    console.log(rows[0]);
    res.send(rows[0]);
  };

const CreatePersona = async (req, res) => {
    try {
        const conn = await connect();

        console.log("req.body:", req.body);
        console.log("req.file.filename:", req.file.filename);

        const query = `INSERT INTO persona (
            nombre,
            apellidos,
            direccion,
            imagen
        ) VALUES (?, ?, ?, ?)`;

        const [result] = await conn.execute(query, [
            req.body.nombre,
            req.body.apellidos,
            req.body.direccion,
            req.file.filename
        ]);

        console.log("result:", result);

        res.json({
            id: result.insertId,
            ...req.body,
        });
    } catch (error) {
        console.error("Error al insertar datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
const DeletePersona = async (req, res) => {
    const conn = await connect();
    await conn.query("DELETE FROM persona WHERE id = ?", [req.params.id]);
    res.send("Eliminado");
  };

module.exports = { CreatePersona, getAllPersona, getOnePersona, DeletePersona};
