// Skills.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Autosuggest from "react-autosuggest";
import Button from "react-bootstrap/Button";

const initialState = {
  habilidades: "",
};

function Skills() {
  const [personas, setPersonas] = useState([]); // Cambiado a 'personas' y inicializado como un array vacío
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
        toast.error(
          "Error al obtener las personas. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al obtener las personas", error);
      toast.error(
        "Error inesperado al obtener las personas. Por favor, inténtalo de nuevo."
      );
    }
  };

  const onSuggestionsClearRequested = () => {
    setPersonas([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.nombre} - ${suggestion.apellidos}`;
  };

  const renderSuggestion = (suggestion) => (
    <div className="sugerencia" onClick={() => seleccionarPersona(suggestion)}>
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
      data.id_persona = personaSeleccionada.persona_id;

      const response = await axios.post(
        "http://localhost:5000/habilidades",
        data
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Habilidad guardado exitosamente.");
        resetForm(); // Restablecer el formulario después de guardar exitosamente.
      } else {
        console.error("Error al guardar el Habilidad");
        toast.error(
          "Error al guardar el Habilidad. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al guardar el Habilidad", error);
      toast.error(
        "Error inesperado al guardar el Habilidad. Por favor, inténtalo de nuevo."
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

export default Skills;
