import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "react-bootstrap/Accordion";
import GeneralInfo from "./generalInfo";
import ProfessionalExperience from "./ProfessionalExperience";
import AcademicInfo from "./AcademicInfo";
import Skills from "./Skills";
import Languages from "./Languages";

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
  const {} = datos;

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
    <div className="si">
      <Container>
        <Accordion defaultActiveKey="0">
          <Row>
            <Col>
              <h1 className="title">Crea tu Curriculum Vitae</h1>
              <text className="texto">Ingresa tus datos</text>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Accordion.Item eventKey="0" className="accordion">
              <Accordion.Header>Datos Generales</Accordion.Header>
              <Accordion.Body>
              <GeneralInfo datos={datos} handleInputChange={handleInputChange} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Experiencia Profesional</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <p className="fs-3">Experiencia Profesional</p>
                  </Col>
                </Row>
                <ProfessionalExperience
                  datos={datos}
                  handleInputChange={handleInputChange}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Información Académica</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <p className="fs-3">Información Académica</p>
                  </Col>
                </Row>
                <AcademicInfo
                  datos={datos}
                  handleInputChange={handleInputChange}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Habilidades</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <p className="fs-3">Habilidades</p>
                  </Col>
                </Row>
                <Skills datos={datos} handleInputChange={handleInputChange} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Idiomas</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <p className="fs-3">Idiomas</p>
                  </Col>
                </Row>
                <Languages
                  datos={datos}
                  handleInputChange={handleInputChange}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Row className="botones">
              <Col className="btns">
                <Button className="btn btn-danger">Cancelar</Button>
              </Col>

              <Col className="btns">
                <Button type="submit" className="btn btn-primary">
                  Subir
                </Button>
              </Col>
            </Row>
          </Form>
          <ToastContainer />
        </Accordion>
      </Container>
    </div>
  );
}

export default SubirCV;
