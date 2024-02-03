// AcademicInfo.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import {ToastContainer, toast } from "react-toastify";
import Autosuggest from "react-autosuggest";
import Button from "react-bootstrap/Button";

const initialState = {
  grados_academicos: "",
  institucion: "",
  ubicacion: "",
  fecha_inicio: "",
  fecha_fin: "",
};

function AcademicInfo() {
  const [personas, setPersonas] = useState([]);  // Cambiado a 'personas' y inicializado como un array vacío
  const [value, setValue] = useState("");
  const [personaSeleccionada, setPersonaSeleccionada] = useState({});

  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await axios.get(`http://localhost:5000/persona`);
  
      if (response.status === 200) {
        const personas = response.data;
        setPersonas(personas);
      } else {
        console.error("Error al obtener las personas");
        toast.error("Error al obtener las personas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error inesperado al obtener las personas", error);
      toast.error("Error inesperado al obtener las personas. Por favor, inténtalo de nuevo.");
    }
  };

  const onSuggestionsClearRequested = () => {
    setPersonas([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.nombre} - ${suggestion.apellidos}`;
  };

  const renderSuggestion = (suggestion) => (
    <div
      className="sugerencia"
      onClick={() => seleccionarPersona(suggestion)}
    >
      {`${suggestion.nombre} - ${suggestion.apellidos}`}
    </div>
  );

  const seleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Nombre o Apellidos de la Persona",
    value,
    onChange,
  };

  const eventEnter = (e) => {
    if (e.key === "Enter") {
      var split = e.target.value.split("-");
      var persona = {
        nombre: split[0].trim(),
        apellidos: split[1].trim(),
      };
      seleccionarPersona(persona);
    }
  };

  /////////////////////////////////////////////////////////
  const [datos, setDatos] = useState(initialState);
  const {
    grados_academicos,
    institucion,
    ubicacion,
    fecha_inicio,
    fecha_fin,
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
      data.id_candidato = personaSeleccionada.persona_id;
      const response = await axios.post(
        "http://localhost:5000/preparacion",
        data
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Preparacion guardado exitosamente.");
        resetForm(); // Restablecer el formulario después de guardar exitosamente.
      } else {
        console.error("Error al guardar el Preparacion");
        toast.error(
          "Error al guardar el Preparacion. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al guardar el Preparacion", error);
      toast.error(
        "Error inesperado al guardar el Preparacion. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
      <Autosuggest
          suggestions={personas}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={eventEnter}
        />
        <Row className="mt-3 mb-3">
          <Col>
            <FloatingLabel label="Grado(s) Adadémicos">
              <Form.Control
                name="grados_academicos"
                type="text"
                placeholder="Ingresa Grado(s) Adadémicos"
                value={grados_academicos}
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
                name="ubicacion"
                type="text"
                placeholder="Ingresa Ubicación"
                value={ubicacion}
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
                name="fecha_inicio"
                type="date"
                placeholder="Ingresa Fecha de Inicio"
                value={fecha_inicio}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel label="Año de Graduación">
              <Form.Control
                name="fecha_fin"
                type="date"
                placeholder="Ingresa Año de Graduación"
                value={fecha_fin}
                onChange={handleInputChange}
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

export default AcademicInfo;
