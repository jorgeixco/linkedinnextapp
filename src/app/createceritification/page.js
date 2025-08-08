'use client'
import React from "react";
import { useFrom } from "../../hooks/useFrom";

const CertificacionPanel = () => {
  const { data, loader, handleChange, handleCreateCertification } = useFrom();
  

  return (
    <div
      className="bg-white text-[#0f2f4f]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Banner */}
      <section className=" px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Panel de Creación de certificación
        </h1>
      </section>

      {/* Main */}
      <main className="w-full flex flex-col items-center justify-center min-h-75vh">
        <h2 className="text-center text-[#0f6ba8] text-2xl font-normal mb-8">
          Crear certificación
        </h2>
        <form className="space-y-4" onSubmit={handleCreateCertification}>
          <input
            id="tipo"
            type="text"
            placeholder="Tipo"
            value={data.tipo}
            onChange={handleChange}
            className="w-full input"
            disabled={loader}
          />
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del certificado"
            value={data.nombre}
            onChange={handleChange}
            className="w-full input"
            disabled={loader}
          />
          <button
            type="submit"
            className="w-full button"
            disabled={loader}
          >
            {loader ? 'Creando certificado...' : 'Crear certificado →'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CertificacionPanel;
