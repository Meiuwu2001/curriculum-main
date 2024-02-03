// Languages.js
import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Autosuggest from "react-autosuggest";



const initialState = {
  idioma: "",
  nivel_competencia: "",
  escaneo_certificado: "",
};

function Languages() {
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
  const [datos2, setDatos2] = useState(initialState);

  const resetForm = () => {
    setDatos2(initialState);
  };

  const handleInputChange2 = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "file" ? e.target.files[0] : value;

    setDatos2({ ...datos2, [name]: newValue });
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    console.log("id", personaSeleccionada.persona_id)
    try {
      const formData = new FormData();
      formData.append("id_curriculumm", personaSeleccionada.persona_id);
      // Agregar todos los campos al objeto FormData
      Object.entries(datos2).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log(' Soy el form data para que no pierdas');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

      const response = await axios.post(
        "http://localhost:5000/idiomas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Datos generales guardados exitosamente.");
        resetForm(); // Restablecer el formulario después de guardar exitosamente.
      } else {
        console.error("Error al guardar los datos generales");
        toast.error(
          "Error al guardar los datos generales. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al guardar los datos generales", error);
      toast.error(
        "Error inesperado al guardar los datos generales. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit2}>
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
            <FloatingLabel label="Idiomas">
              <Form.Control
                name="idioma"
                type="text"
                placeholder="Ingresa Idiomas"
                onChange={handleInputChange2}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mt-3 mb-3">
          <Col>
            <FloatingLabel label="Nivel de Habilidad">
              <Form.Control
                name="nivel_competencia"
                type="text"
                placeholder="Ingresa Nivel de Habilidad"
                onChange={handleInputChange2}
                required
              />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel label="Curso o Certificación">
              <Form.Control
                name="escaneo_certificado"
                type="file"
                placeholder="Ingresa Curso o Certificación"
                onChange={handleInputChange2}
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

export default Languages;
