const connect = require("../connect");

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

module.exports = { CreatePersona };
