'use client'
import React from "react";
import CreateUser from "../../components/CreateUser";

const CreacionColaborador = () => {
  // Esta página ahora sirve como acceso administrativo directo
  // El formulario permite crear usuarios manualmente sin datos de LinkedIn
  return <CreateUser userProfile={null} />;
};

export default CreacionColaborador; 