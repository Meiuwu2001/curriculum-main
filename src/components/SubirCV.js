import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  nombre: "",
  apellidos: "",
  profesion: "",
  direccion: "",
  telefono: "",
  email: "",
  fecha_nacimiento: "",
  puesto: "",
  empresa: "",
  ubicacion_empresa: "",
  inicio_empresa: "",
  fin_empresa: "",
  funciones: "",
  grado_academico: "",
  institucion: "",
  ubicacion_institucion: "",
  inicio_institucion: "",
  graduacion: "",
  habilidades: "",
  idiomas: "",
  nivel: "",
  certificacion: "",
};

function SubirCV() {
  const [datos, setDatos] = useState(initialState);
  const {
    nombre,
    apellidos,
    profesion,
    direccion,
    telefono,
    email,
    fecha_nacimiento,
    puesto,
    empresa,
    ubicacion_empresa,
    inicio_empresa,
    fin_empresa,
    funciones,
    grado_academico,
    institucion,
    ubicacion_institucion,
    inicio_institucion,
    graduacion,
    habilidades,
    idiomas,
    nivel,
    certificacion,
  } = datos;

  const resetForm = () => {
    setDatos(initialState);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDatos(datos);
  };

  const addDatos = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/curriculum",
        data
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Curriculum guardado exitosamente.");
        resetForm(); // Restablecer el formulario después de guardar exitosamente.
      } else {
        console.error("Error al guardar el curriculum");
        toast.error(
          "Error al guardar el curriculum. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al guardar el curriculum", error);
      toast.error(
        "Error inesperado al guardar el curriculum. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Curriculum Vitae</h1>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <p className="fs-3">Datos Generales</p>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Nombre(s)">
                <Form.Control
                  name="nombre"
                  type="text"
                  placeholder="Ingresa nombre"
                  value={nombre}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Apellidos">
                <Form.Control
                  name="apellidos"
                  type="text"
                  placeholder="Ingresa Apellidos"
                  value={apellidos}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Profesión">
                <Form.Control
                  name="Profesion"
                  type="text"
                  placeholder="Ingresa Profesión"
                  value={profesion}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Dirección">
                <Form.Control
                  name="direccion"
                  type="text"
                  placeholder="Ingresa Dirección"
                  value={direccion}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Teléfono">
                {" "}
                <Form.Control
                  name="telefono"
                  type="text"
                  placeholder="Ingresa Telefono (618)1232323"
                  value={telefono}
                  onChange={handleInputChange}
                  pattern="[(][0-9]{3}[)][0-9]{7}"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Correo Electrónico">
                <Form.Control
                  name="correo_electronico"
                  type="email"
                  placeholder="Ingresa Correo Electrónico"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Fecha de Nacimiento">
                <Form.Control
                  name="fecha_nacimiento"
                  type="date"
                  placeholder="Ingresa Fecha de Nacimiento"
                  value={fecha_nacimiento}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="fs-3">Experiencia Profesional</p>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Título/Puesto">
                <Form.Control
                  name="puesto"
                  type="text"
                  placeholder="Ingresa Título/Puesto"
                  value={puesto}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Empresa">
                <Form.Control
                  name="empresa"
                  type="text"
                  placeholder="Ingresa Empresa"
                  value={empresa}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Ubicación">
                <Form.Control
                  name="ubicacion_empresa"
                  type="text"
                  placeholder="Ingresa Ubicación"
                  value={ubicacion_empresa}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Fecha de Inicio">
                <Form.Control
                  name="inicio_empresa"
                  type="date"
                  placeholder="Ingresa Fecha de Inicio"
                  value={inicio_empresa}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Fecha de Finalización">
                <Form.Control
                  name="fin_empresa"
                  type="date"
                  placeholder="Ingresa Fecha de Finalización"
                  value={fin_empresa}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Funciones y Logros">
                <Form.Control
                  name="funciones"
                  type="text"
                  placeholder="Ingresa Funciones y Logros"
                  value={funciones}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="fs-3">Datos Académicos</p>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Grado(s) Adadémicos">
                <Form.Control
                  name="grado_academico"
                  type="text"
                  placeholder="Ingresa Grado(s) Adadémicos"
                  value={grado_academico}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Centro de Estudios/Institución">
                <Form.Control
                  name="institucion"
                  type="text"
                  placeholder="Ingresa Centro de Estudios/Institución"
                  value={institucion}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Ubicación">
                <Form.Control
                  name="ubicacion_institucion"
                  type="text"
                  placeholder="Ingresa Ubicación"
                  value={ubicacion_institucion}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Fecha de Inicio">
                <Form.Control
                  name="inicio_institucion"
                  type="date"
                  placeholder="Ingresa Fecha de Inicio"
                  value={inicio_institucion}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Año de Graduación">
                <Form.Control
                  name="graduacion"
                  type="date"
                  placeholder="Ingresa Año de Graduación"
                  value={graduacion}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="fs-3">Habilidades</p>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Habilidades">
                <Form.Control
                  name="habilidades"
                  type="text"
                  placeholder="Ingresa Habilidades"
                  value={habilidades}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="fs-3">Idiomas</p>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Idiomas">
                <Form.Control
                  name="idiomas"
                  type="text"
                  placeholder="Ingresa Idiomas"
                  value={idiomas}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Nivel de Habilidad">
                <Form.Control
                  name="nivel"
                  type="text"
                  placeholder="Ingresa Nivel de Habilidad"
                  value={nivel}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Curso o Certificación">
                <Form.Control
                  name="certificacion"
                  type="text"
                  placeholder="Ingresa Curso o Certificación"
                  value={certificacion}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button type="submit" className="btn btn-primary">
                Guardar
              </Button>
            </Col>

            <Col>
              <Button className="btn btn-danger">Cancelar</Button>
            </Col>
          </Row>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
}

export default SubirCV;
