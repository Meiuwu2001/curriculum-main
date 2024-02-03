import React, { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { Modal, Button, Alert } from "react-bootstrap";

function ListaCV() {
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [curriculumList, setCurriculumList] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetchData();
    initializeGrid(); // Inicializa el Grid al montar el componente
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      // Solo renderiza el Grid si hay datos
      updateGridData();
    }
  }, [curriculumList]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/persona");
      const data = await response.json();
      setCurriculumList(data);
    } catch (error) {
      console.error("Error al obtener la lista de curriculum", error);
    }
  };

  const initializeGrid = () => {
    // Inicializa el Grid y guarda la referencia en gridRef.current
    gridRef.current = new Grid({
      columns: [
        "ID",
        "Nombre",
        "Apellidos",
        "Idioma",
        "Nivel",

        {
          name: "Eliminar",
          formatter: (cell, row) => {
            return h(
              "div",
              {},
              h(
                "button",
                {
                  className: "btn btn-danger",
                  onClick: () => handleShowConfirmModal(row.cells[0].data),
                },
                "Eliminar"
              )
            );
          },
        },
        {
          name: "Ver Certificado",
          formatter: (cell, row) => {
            const certificadoUrl = `/certificates/${row.cells[5].data}`; // Ajusta la posición según la estructura de la respuesta
            return h(
              "div",
              {},
              h(
                "a",
                {
                  href: certificadoUrl,
                  target: "_blank",
                  className: "btn btn-primary",
                },
                "Ver Certificado"
              )
            );
          },
        },
      ],
      width: "auto",
      search: true,
      pagination: {
        enabled: true,
        limit: 5,
        summary: true,
      },
      sort: true,
      style: {
        th: {
          background: "#b28ef3",
          color: "#fbf8f8",
          border: "3px solid #ccc",
          textAlign: "center",
        },
      },
      autoWidth: true,
      language: {
        search: {
          placeholder: "🔍 Buscar...",
        },
        pagination: {
          previous: "⬅️",
          next: "➡️",
          showing: "😃 Mostrando",
          results: () => "registros",
        },
      },
      server: {
        url: "http://localhost:5000/idiomas",
        then: (data) =>
          data.map((curriculum) => [
            curriculum.persona_id,
            curriculum.nombre,
            curriculum.apellidos,
            curriculum.idioma,
            curriculum.nivel_competencia,
            curriculum.escaneo_certificado,
          ]),
      },
    });

    gridRef.current.render(wrapperRef.current);
};

  const updateGridData = () => {
    // Actualiza los datos en el Grid
    gridRef.current.updateConfig({
      data: curriculumList.map((curriculum) => [
        curriculum.persona_id,
        curriculum.nombre,
        curriculum.apellidos,
        curriculum.idioma,
        curriculum.nivel_competencia,
        curriculum.escaneo_certificado,

      ]),
    });
    gridRef.current.forceRender();
  };

  const handleShowConfirmModal = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <h1 class="title">Lista de CVs</h1>
      <div
        ref={wrapperRef}
        style={{ textAlign: "center", marginTop: "30px" }}
      />

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            ¿Estás seguro de que deseas eliminar este curriculum?
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              handleCloseConfirmModal();
              try {
                const res = await fetch(
                  `http://localhost:5000/idioma/${deleteId}`,
                  {
                    method: "DELETE",
                  }
                );

                if (res.ok) {
                  toast.success("Curriculum eliminado exitosamente.");
                  fetchData();
                } else {
                  toast.error(
                    "Error al eliminar el curriculum. Por favor, inténtalo de nuevo."
                  );
                }
              } catch (error) {
                toast.error(
                  "Error inesperado al eliminar el curriculum. Por favor, inténtalo de nuevo."
                );
              }
            }}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default ListaCV;
