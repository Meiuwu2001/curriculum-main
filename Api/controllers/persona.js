const connect = require("../connect");



const getAllPersona = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM persona");
    console.log(rows);
    res.send(rows);
  };
  const getOnePersona = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM persona WHERE persona_id = ?", [
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
              profesion,
              direccion,
              telefono,
              correo_electronico,
              fecha_nacimiento,
              imagen
          ) VALUES (?,?,?,?,?,?,?,?)`;

          const [result] = await conn.execute(query, [
              req.body.nombre,
              req.body.apellidos,
              req.body.profesion,
              req.body.direccion,
              req.body.telefono,
              req.body.correo_electronico,
              req.body.fecha_nacimiento,
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
const UpdatePersona = async (req, res) => {
  try {
    const conn = await connect();

    const query = `
            UPDATE persona 
            SET 
                nombre = ?,
                apellidos = ?,
                profesion = ?,
                direccion = ?,
                telefono = ?,
                correo_electronico = ?,
                fecha_nacimiento = ?
            WHERE persona_id = ?;
        `;

    const { id, ...newData } = req.body;

    const [result] = await conn.query(query, [
      newData.nombre,
      newData.apellidos,
      newData.profesion,
      newData.direccion,
      newData.telefono,
      newData.correo_electronico,
      newData.fecha_nacimiento,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró el registro para actualizar" });
    }

    res.json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const DeletePersona = async (req, res) => {
    const conn = await connect();
    await conn.query("DELETE FROM persona WHERE persona_id = ?", [req.params.id]);
    res.send("Eliminado");
  };

module.exports = { CreatePersona, getAllPersona, UpdatePersona, getOnePersona, DeletePersona};
