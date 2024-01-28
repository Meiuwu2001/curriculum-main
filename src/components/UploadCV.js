// UploadCV.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

const UploadCV = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [objective, setObjective] = useState('');
  const [education, setEducation] = useState('');
  const [institution, setInstitution] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');

  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('linkedin', linkedin);
    formData.append('github', github);
    formData.append('objective', objective);
    formData.append('education', education);
    formData.append('institution', institution);
    formData.append('graduationDate', graduationDate);
    formData.append('experience', experience);
    formData.append('skills', skills);
    formData.append('languages', languages);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/uploadCV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Actualizar la lista de CVs después de la subida
    } catch (error) {
      console.error('Error al subir el CV', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mt-5">
      <h2>Subir Currículum Vitae</h2>
      <form>
        {/* Otros campos del currículum */}
        {/* ... */}

        <div className="mb-3">
          <label htmlFor="file" className="form-label">Seleccionar Archivo:</label>
          <input type="file" className="form-control" id="file" onChange={handleFileChange} />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleFileUpload}>
          Subir Currículum Vitae
        </button>
      </form>
    </div>
  );
};

export default UploadCV;
