// Languages.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

const AcademicInfo = ({ datos, handleInputChange }) => {
  const {
    idiomas,
    nivel,
    certificacion,
  } = datos;

  return (
    <>
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
    </>
  );
};

export default AcademicInfo;
