// AcademicInfo.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

const AcademicInfo = ({ datos, handleInputChange }) => {
  const {
    grado_academico,
    institucion,
    ubicacion_institucion,
    inicio_institucion,
    graduacion,
  } = datos;

  return (
    <>
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
    </>
  );
};

export default AcademicInfo;
