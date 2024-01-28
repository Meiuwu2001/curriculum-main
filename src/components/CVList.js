// CVList.js
import React from 'react';

const CVList = ({ cvs, onDelete }) => {
  return (
    <div>
      <h2>Lista de Currículos Vitae</h2>
      <ul>
        {cvs.map((cv) => (
          <li key={cv.id}>
            {cv.name} -{' '}
            <button onClick={() => onDelete(cv.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVList;
