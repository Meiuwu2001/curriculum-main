// AcademicInfo.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  grado_academico: "",
  institucion: "",
  ubicacion_institucion: "",
  inicio_institucion: "",
  graduacion: "",
};

function AcademicInfo() {
  const [datos, setDatos] = useState(initialState);
  const {
    grado_academico,
    institucion,
    ubicacion_institucion,
    inicio_institucion,
    graduacion,
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
      <Form onSubmit={handleSubmit}>
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
      </Form>
    </>
  );
}

export default AcademicInfo;
