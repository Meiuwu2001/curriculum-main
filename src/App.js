// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import BarraSuperior from "./components/BarraSuperior";
import SubirCV from "./components/SubirCV";
import Home from "./components/Home";
import EliminarCV from "./components/EliminarCV";
import ModificarCV from "./components/ModificarCV";
import ListaCV from "./components/ListaCV";
import ListaIdiomas from "./components/ListaIdiomas";
import "./App.css";

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
          <Route path="idiomas">
          <Route index element={<ListaIdiomas />} />

          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
