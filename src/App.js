// App.js
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import BarraSuperior from "./components/BarraSuperior";
import SubirCV from "./components/SubirCV";
import Home from "./components/Home";
import EliminarCV from "./components/EliminarCV";
import ModificarCV from "./components/ModificarCV";
import ListaCV from "./components/ListaCV";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BarraSuperior />}>
          <Route index element={<Home />} />
          <Route path="cv">
            <Route index element={<ListaCV />} />
            <Route path="agregar" element={<SubirCV />} />
            <Route path="eliminar/:cv" element={<EliminarCV />} />
            <Route path="modificar/:cv" element={<ModificarCV />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

