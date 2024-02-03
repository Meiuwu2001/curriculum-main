import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Image from "react-bootstrap/Image";  // Importa el componente Image



const initialState = {
  nombre: "",
  apellidos: "",
  profesion: "",
  direccion: "", 
  telefono: "",
  correo_electronico: "",
  imagen: "",  // Agrega el campo imagen a tu estado

};
function ModificarCV() {
  
  const [Persona, setPersona] = useState(initialState);
  const {
    nombre,
    apellidos,
    profesion,
    direccion,
    telefono,
    correo_electronico,
    imagen
  } = Persona;

  const {cv} = useParams()

  useEffect(() => {
    getPersona(cv);
    console.log("ID from useParams:", cv);

  }, []);

  const getPersona = async (m) => {
    const res = await fetch(`http://127.0.0.1:5000/persona/${m}`);
    const dato = await res.json();
    setPersona(dato);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setPersona({ ...Persona, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    modifyCV(Persona);
  };
  const modifyCV = async (data) => {
    const response = await axios.put(
      `http://localhost:5000/persona/${cv}`,
      data
    );
    if (response.status === 200) {
      console.log(response.data);
      toast.success("Persona modificado exitosamente.");

    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Curriculum Vitae</h1>
          </Col>
        </Row>
     {/* Añade el componente Image para mostrar la imagen */}
     <Row className="mt-3 mb-3">
          <Col>
          <Image src={`/images/${imagen}`} alt="Imagen de la persona" fluid />
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <p className="fs-3">Datos personales</p>
            </Col>
          </Row>

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
              <FloatingLabel label="Apellido Paterno">
                <Form.Control
                  name="apellidos"
                  type="text"
                  placeholder="Ingresa Apellido paterno"
                  value={apellidos}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Col>

           
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="Profesión">
                <Form.Control
                  name="profesion"
                  type="text"
                  placeholder="Ingresa profesión"
                  value={profesion}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Dirección">
                <Form.Control
                  name="direccion"
                  type="text"
                  placeholder="Ingresa profesión"
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
                  placeholder="Ingresa Correo electronico"
                  value={correo_electronico}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>

          
          </Row>

          <Row>
            <Col>
              <Button type="submit" className="btn btn-primary">
                Guardar
              </Button>
            </Col>

            <Col>
              

            </Col>
          </Row>

          {/* <Row className='mt-3 mb-3'>

                                               <Col></Col>

                                               <Col></Col>

                               </Row> */}
        </Form>
        <ToastContainer />

      </Container>
    </>
  );
}

export default ModificarCV;
