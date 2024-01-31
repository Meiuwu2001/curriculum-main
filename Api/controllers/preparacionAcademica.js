const connect = require("../connect");

const getAllPreparacion = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM preparacionacademica");
  console.log(rows);
  res.send(rows);
};

const getOnePreparacion = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query(
    "SELECT * FROM preparacionacademica WHERE id = ?",
    [req.params.id]
  );
  console.log(rows[0]);
  res.send(rows[0]);
};

const CreatePreparacion = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const conn = await connect();

    // Definir la consulta de inserción
    const query = `
            INSERT INTO preparacionacademica (
                id_candidato, 
                nivel_educactivo, 
                institucion, 
                titulo_obtenido, 
                fecha_inicio, 
                fecha_fin, 
                notas 
    
                
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    // Ejecutar la consulta con los datos del cuerpo de la solicitud (req.body)
    const [result] = await conn.query(query, [
      req.body.id_cadidato,
      req.body.nivel_educativo,
      req.body.institucion,
      req.body.titulo_obtenido,
      req.body.fecha_inicio,
      req.body.fecha_fin,
      req.body.notas,
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

const DeletePreparacion = async (req, res) => {
  const conn = await connect();
  await conn.query("DELETE FROM idiomas WHERE id = ?", [req.params.id]);
  res.send("Eliminado");
};

const UpdatePreparacion = async (req, res) => {
  try {
    const conn = await connect();

    const query = `
            UPDATE preparacionacademica 
            SET 
                id_candidato = ?,
                nivel_educativo = ?,
                institucion = ?,
                titulo_obtenido = ?,
                fecha_inicio = ?,
                fecha_fin = ?
            WHERE id = ?;
        `;

    const { id, ...newData } = req.body;

    const [result] = await conn.query(query, [
      req.body.id_cadidato,
      req.body.nivel_educativo,
      req.body.institucion,
      req.body.titulo_obtenido,
      req.body.fecha_inicio,
      req.body.fecha_fin,
      req.body.notas,
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
  getAllPreparacion,
  getOnePreparacion,
  CreatePreparacion,
  DeletePreparacion,
  UpdatePreparacion,
};