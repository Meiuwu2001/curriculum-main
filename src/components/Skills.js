// Skills.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

const AcademicInfo = ({ datos, handleInputChange }) => {
  const {
    habilidades,
  } = datos;

  return (
    <>
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
    </>
  );
};

export default AcademicInfo;
