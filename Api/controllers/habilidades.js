const connect = require("../connect");

const getAllHabilidades = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM habilidades");
  console.log(rows);
  res.send(rows);
};

const getOneHabilidades = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query(
    "SELECT * FROM habilidades WHERE id = ?",
    [req.params.id]
  );
  console.log(rows[0]);
  res.send(rows[0]);
};

const CreateHabilidades = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const conn = await connect();

    // Definir la consulta de inserción
    const query = `
    INSERT INTO habilidades (
      habilidades, 
      id_persona
  ) VALUES (?, ?)
        `;

    // Ejecutar la consulta con los datos del cuerpo de la solicitud (req.body)
    const [result] = await conn.query(query, [
      req.body.habilidades,
      req.body.id_persona,
    ]);
    // Enviar la respuesta JSON con el ID insertado y los datos de la solicitud
    res.json({
      id: result.insertId,
      ...req.body,
    });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const DeleteHabilidades = async (req, res) => {
  const conn = await connect();
  await conn.query("DELETE FROM habilidades WHERE id = ?", [req.params.id]);
  res.send("Eliminado");
};

const UpdateHabilidades = async (req, res) => {
  try {
    const conn = await connect();

    const query = `
            UPDATE habilidades 
            SET 
                fecha_inicio = ?,
                fecha_fin = ?,
                grados_academicos = ?,
                ubicacion = ?
            WHERE id = ?;
        `;

    const { id, ...newData } = req.body;

    const [result] = await conn.query(query, [
      req.body.id_cadidato,
      req.body.fecha_inicio,
      req.body.fecha_fin,
      req.body.grados_academicos,
      req.body.ubicacion,
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

module.exports = {
  getAllHabilidades,
  getOneHabilidades,
  CreateHabilidades,
  DeleteHabilidades,
  UpdateHabilidades,
};
