const connect = require("../connect");

const getAllCertificacion = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT idiomas.*, persona.* FROM idiomas INNER JOIN persona ON idiomas.id_curriculumm = persona.persona_id");
  console.log(rows);
  res.send(rows);
};

const getOneCertificacion = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT idiomas.*, persona.* FROM idiomas INNER JOIN persona ON idiomas.id_curriculumm = persona.persona_id  WHERE idiomas.id = ?  ", [
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
                nivel_competencia, 
                id_curriculumm,
                escaneo_certificado 
            ) VALUES (?, ?, ?, ?)
        `;

    // Ejecutar la consulta con los datos del cuerpo de la solicitud (req.body)
    const [result] = await conn.execute(query, [
      req.body.idioma,
      req.body.nivel_competencia,
      req.body.id_curriculumm,
      req.file.filename,
    ]);
    console.log("result:", result);

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



module.exports = {
  getAllCertificacion,
  getOneCertificacion,
  CreateCertificacion,
  DeleteCertificacion,
};
