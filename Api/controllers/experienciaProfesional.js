const connect = require("../connect");

const getAllExperiencia = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT experiencia_profesional.*, persona.* FROM experiencia_profesional INNER JOIN persona ON experiencia_profesional.id_persona = persona.persona_id");
  console.log(rows);
  res.send(rows);
};

const getOneExperiencia = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM experiencia_profesional WHERE id = ?", [
    req.params.id,
  ]);
  console.log(rows[0]);
  res.send(rows[0]);
};

const CreateExperiencia = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const conn = await connect();

    // Definir la consulta de inserción
    const query = `
            INSERT INTO experiencia_profesional (
                titulo, 
                empresa, 
                ubicacion, 
                fecha_inicio, 
                fecha_fin, 
                funciones,
                id_persona
            ) VALUES (?,?,?,?,?,?,?)
        `;

    // Ejecutar la consulta con los datos del cuerpo de la solicitud (req.body)
    const [result] = await conn.query(query, [
      req.body.titulo,
      req.body.empresa,
      req.body.ubicacion,
      req.body.fecha_inicio,
      req.body.fecha_fin,
      req.body.funciones,
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

const DeleteExperiencia = async (req, res) => {
  const conn = await connect();
  await conn.query("DELETE FROM experiencia_profesional WHERE id = ?", [req.params.id]);
  res.send("Eliminado");
};

const UpdateExperiencia = async (req, res) => {
  try {
    const conn = await connect();

    const query = `
            UPDATE experiencia_profesional 
            SET 
                titulo = ?,
                empresa = ?,
                ubicacion = ?,
                fecha_inicio = ?,
                fecha_fin = ?,
                funciones = ?,
                id_persona = ?
            WHERE id = ?;
        `;

    const { id, ...newData } = req.body;

    const [result] = await conn.query(query, [
      newData.titulo,
      newData.empresa,
      newData.ubicacion,
      newData.fecha_inicio,
      newData.fecha_fin,
      newData.funciones,
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
  getAllExperiencia,
  getOneExperiencia,
  CreateExperiencia,
  DeleteExperiencia,
  UpdateExperiencia,
};
