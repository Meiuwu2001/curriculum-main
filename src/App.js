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
import Login from "./components/Login";

import "./App.css";
function parseJWT (token) {
  const base64url = token.split('.')[1];
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
}).join(''));
return  JSON.parse(jsonPayload);
}


const App = () => {
  let tokenExistAndIsValid = (parseJWT(localStorage.getItem('token')).exp * 1000) > Date.now();
  return (
    <div>
     {tokenExistAndIsValid ?
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
    </Routes> : <Login /> }
    </div>
  );
};

export default App;
