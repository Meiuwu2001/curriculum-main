const connect = require("../connect");

const getAllCertificacion = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM idiomas");
  console.log(rows);
  res.send(rows);
};

const getOneCertificacion = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM idiomas WHERE id = ?", [
    req.params.id,
  ]);
  console.log(rows[0]);
  res.send(rows[0]);
};

const CreateCertificacion = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const conn = await connect();

    // Definir la consulta de inserción
    const query = `
            INSERT INTO idiomas (
                idioma, 
                nombre_certificado, 
                fecha_obtencion, 
                puntaje_obtenido, 
                institucion_emisora, 
                numero_identificacion_certificado, 
                nivel_competencia, 
                duracion_validez, 
                escaneo_certificado, 
                informacion_sesion_examen, 
                notas_adicionales, 
                id_curriculum
                
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    // Ejecutar la consulta con los datos del cuerpo de la solicitud (req.body)
    const [result] = await conn.query(query, [
      req.body.idioma,
      req.body.nombre_certificado,
      req.body.fecha_obtencion,
      req.body.puntaje_obtenido,
      req.body.institucion_emisora,
      req.body.numero_identificacion_certificado,
      req.body.nivel_competencia,
      req.body.duracion_validez,
      req.body.escaneo_certificado,
      req.body.informacion_sesion_examen,
      req.body.notas_adicionales,
      req.body.id_curriculum,
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

const DeleteCertificacion = async (req, res) => {
  const conn = await connect();
  await conn.query("DELETE FROM idiomas WHERE id = ?", [req.params.id]);
  res.send("Eliminado");
};

const UpdateCerficiacion = async (req, res) => {
  try {
    const conn = await connect();

    const query = `
            UPDATE idiomas 
            SET 
                idioma = ?,
                nombre_certificao = ?,
                fecha_obtencion = ?,
                puntaje_obtenido = ?,
                institucion_emisora = ?,
                numero_identificacion = ?,
                nivel_competencia = ?,
                durancion_validez = ?,
                escaneo_certificado = ?,
                informacion_sesion_examen = ?,
                notas_adicionales = ?,
                id_curriculum = ?
            WHERE id = ?;
        `;

    const { id, ...newData } = req.body;

    const [result] = await conn.query(query, [
      req.body.idioma,
      req.body.nombre_certificado,
      req.body.fecha_obtencion,
      req.body.puntaje_obtenido,
      req.body.institucion_emisora,
      req.body.numero_identificacion_certificado,
      req.body.nivel_competencia,
      req.body.duracion_validez,
      req.body.escaneo_certificado,
      req.body.informacion_sesion_examen,
      req.body.notas_adicionales,
      req.body.id_curriculum,
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
  getAllCertificacion,
  getOneCertificacion,
  CreateCertificacion,
  DeleteCertificacion,
  UpdateCerficiacion,
};
