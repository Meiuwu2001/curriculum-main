import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import  App  from "../App";

// function parseJWT(token) {
//   const base64url = token.split(".")[1];
//   const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
//   return JSON.parse(jsonPayload);
// }

const Login = () => {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [login, setLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username: username,
        contrasena: contrasena,
      };

      const response = await axios.post("http://localhost:5000/login", data);

      if (response.status === 200) {
        console.log(response.data);
        if (response.data.token) {
          // console.log(parseJWT(response.data.token));
          localStorage.setItem("token", response.data.token);
          setLogin(true);
        }
        console.log("incio de sesion correcto");
      } else {
        console.error("Error al iniciar sesión");
        // Aquí puedes agregar lógica para manejar errores, como mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error inesperado al iniciar sesión", error);
      // Aquí puedes agregar lógica para manejar errores, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <>
      {login ? (
        <App />
      ) : (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6}>
              <h2 className="text-center mb-4">Inicio de sesión</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu usuario..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  Iniciar sesión
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;
