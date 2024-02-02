// ProfessionalExperience.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  puesto: "",
  empresa: "",
  ubicacion_empresa: "",
  inicio_empresa: "",
  fin_empresa: "",
  funciones: "",
};

function ProfessionalExperience() {
  const [datos, setDatos] = useState(initialState);
  const {
    puesto,
    empresa,
    ubicacion_empresa,
    inicio_empresa,
    fin_empresa,
    funciones,
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
            <FloatingLabel label="Funciones/Logros">
              <Form.Control
                name="funciones"
                type="text"
                placeholder="Ingresa Funciones/Logros"
                value={funciones}
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

export default ProfessionalExperience;
