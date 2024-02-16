// App.js
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import BarraSuperior from "./components/BarraSuperior";
import SubirCV from "./components/SubirCV";
import Home from "./components/Home";
import EliminarCV from "./components/EliminarCV";
import ModificarCV from "./components/ModificarCV";
import ListaCV from "./components/ListaCV";
import ListaIdiomas from "./components/ListaIdiomas";
import ListaExperiencia from "./components/ListaExperiencia";
import ListaHabilidades from "./components/ListaHabilidades";
import ListaPreparacion from "./components/ListaPreparacion";
import Login from "./components/login/Login";


import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario ha iniciado sesión

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Aquí iría la lógica para verificar las credenciales del usuario y establecer el estado de isLoggedIn
    setIsLoggedIn(true);
  };
  return (
    <div>
      {/* Mostrar el componente de inicio de sesión solo si el usuario no ha iniciado sesión */}
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      
      {/* Mostrar el resto de la aplicación solo si el usuario ha iniciado sesión */}
      {isLoggedIn && (
        <Routes>
          <Route path="/" element={<BarraSuperior />}>
            <Route index element={<Home />} />
            <Route path="cv">
              <Route index element={<ListaCV />} />
              <Route path="agregar" element={<SubirCV />} />
              <Route path="eliminar/:cv" element={<EliminarCV />} />
              <Route path="modificar/:cv" element={<ModificarCV />} />
            </Route>
            <Route path="idiomas">
              <Route index element={<ListaIdiomas />} />
            </Route>
            <Route path="experiencia">
              <Route index element={<ListaExperiencia />} />
            </Route>
            <Route path="habilidades">
              <Route index element={<ListaHabilidades />} />
            </Route>
            <Route path="preparacion">
              <Route index element={<ListaPreparacion />} />
            </Route>
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
