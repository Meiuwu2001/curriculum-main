// Languages.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  idiomas: "",
  nivel: "",
  certificacion: "",
};

function AcademicInfo() {
  const [datos, setDatos] = useState(initialState);
  const { idiomas, nivel, certificacion } = datos;

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
        "http://localhost:5000/idiomas",
        data
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Idioma guardado exitosamente.");
        resetForm(); // Restablecer el formulario después de guardar exitosamente.
      } else {
        console.error("Error al guardar el Idioma");
        toast.error(
          "Error al guardar el Idioma. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al guardar el Idioma", error);
      toast.error(
        "Error inesperado al guardar el Idioma. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
                type="file"
                placeholder="Ingresa Curso o Certificación"
                value={certificacion}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AcademicInfo;
