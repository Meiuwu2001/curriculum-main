const connect = require("../connect");

const getAllCurriculum = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM curriculum");
  console.log(rows);
  res.send(rows);
};

const getOneCurriculum = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM curriculum WHERE id = ?", [
    req.params.id,
  ]);
  console.log(rows[0]);
  res.send(rows[0]);
};

const CreateCurriculum = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const conn = await connect();

    // Definir la consulta de inserción
    const query = `
            INSERT INTO curriculum (
                nombre, 
                apellido_paterno, 
                apellido_materno, 
                direccion, 
                telefono, 
                correo_electronico, 
                preparacion_academica, 
                linkedin, 
                github, 
                experiencia_profesional, 
                idiomas, 
                habilidades, 
                objetivo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    // Ejecutar la consulta con los datos del cuerpo de la solicitud (req.body)
    const [result] = await conn.query(query, [
      req.body.nombre,
      req.body.apellido_paterno,
      req.body.apellido_materno,
      req.body.direccion,
      req.body.telefono,
      req.body.correo_electronico,
      req.body.preparacion_academica,
      req.body.linkedin,
      req.body.github,
      req.body.experiencia_profesional,
      req.body.idiomas,
      req.body.habilidades,
      req.body.objetivo,
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

const DeleteCurriculum = async (req, res) => {
  const conn = await connect();
  await conn.query("DELETE FROM curriculum WHERE id = ?", [req.params.id]);
  res.send("Eliminado");
};

const UpdateCurriculum = async (req, res) => {
  try {
    const conn = await connect();

    const query = `
            UPDATE curriculum 
            SET 
                nombre = ?,
                apellido_paterno = ?,
                apellido_materno = ?,
                direccion = ?,
                telefono = ?,
                correo_electronico = ?,
                preparacion_academica = ?,
                linkedin = ?,
                github = ?,
                experiencia_profesional = ?,
                idiomas = ?,
                habilidades = ?,
                objetivo = ?
            WHERE id = ?;
        `;

    const { id, ...newData } = req.body;

    const [result] = await conn.query(query, [
      newData.nombre,
      newData.apellido_paterno,
      newData.apellido_materno,
      newData.direccion,
      newData.telefono,
      newData.correo_electronico,
      newData.preparacion_academica,
      newData.linkedin,
      newData.github,
      newData.experiencia_profesional,
      newData.idiomas,
      newData.habilidades,
      newData.objetivo,
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
  getAllCurriculum,
  getOneCurriculum,
  CreateCurriculum,
  DeleteCurriculum,
  UpdateCurriculum,
};
