// ProfessionalExperience.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

const ProfessionalExperience = ({ datos, handleInputChange }) => {
  const {
    puesto,
    empresa,
    ubicacion_empresa,
    inicio_empresa,
    fin_empresa,
    funciones,
  } = datos;

  return (
    <>
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
    </>
  );
};

export default ProfessionalExperience;
