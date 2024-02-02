// Skills.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  habilidades: "",
};

function AcademicInfo() {
  const [datos, setDatos] = useState(initialState);
  const { habilidades } = datos;

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
      </Form>
    </>
  );
}

export default AcademicInfo;
