import React, { useState } from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  nombre: "",
  apellidos: "",
  profesion: "",
  direccion: "",
  telefono: "",
  correo_electronico: "",
  fecha_nacimiento: "",
  imagen: null, // Cambiado a un objeto File
};

function GeneralInfo() {
  const [datos1, setDatos1] = useState(initialState);

  const resetForm = () => {
    setDatos1(initialState);
  };

  const handleInputChange1 = (e) => {
    const { name, value, type } = e.target;

    // Si el campo es un archivo (input type="file"), actualizamos la imagen en lugar del valor
    const newValue = type === "file" ? e.target.files[0] : value;

    setDatos1({ ...datos1, [name]: newValue });
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      // Agregar todos los campos al objeto FormData
      Object.entries(datos1).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post("http://localhost:5000/persona", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Datos generales guardados exitosamente.");
        resetForm(); // Restablecer el formulario después de guardar exitosamente.
      } else {
        console.error("Error al guardar los datos generales");
        toast.error("Error al guardar los datos generales. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error inesperado al guardar los datos generales", error);
      toast.error("Error inesperado al guardar los datos generales. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit1}>
        <Row className="mt-3 mb-3">
          <Col>
            <FloatingLabel label="Nombre(s)">
              <Form.Control
                name="nombre"
                type="text"
                placeholder="Ingresa nombre"
                onChange={handleInputChange1}
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
                onChange={handleInputChange1}
              />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel label="Profesión">
              <Form.Control
                name="profesion"
                type="text"
                placeholder="Ingresa Profesión"
                onChange={handleInputChange1}
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
                onChange={handleInputChange1}
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
                onChange={handleInputChange1}
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
                onChange={handleInputChange1}
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
                onChange={handleInputChange1}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel label="Imagen">
              <Form.Control
                name="imagen"
                type="file"
                onChange={handleInputChange1}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>
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
        <ToastContainer />
      </Form>
    </>
  );
}

export default GeneralInfo;
