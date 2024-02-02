// GeneralInfo.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  nombre: "",
  apellidos: "",
  profesion: "",
  direccion: "",
  telefono: "",
  email: "",
  fecha_nacimiento: "",
};

function GeneralInfo() {
  const [datos, setDatos] = useState(initialState);
  const {
    nombre,
    apellidos,
    profesion,
    direccion,
    telefono,
    email,
    fecha_nacimiento,
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
      </Form>
    </>
  );
}

export default GeneralInfo;
