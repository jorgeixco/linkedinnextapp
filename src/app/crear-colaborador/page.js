'use client'
import React from "react";
import { useFrom } from "../../hooks/useFrom";

const CreacionColaborador = () => {
  const { colaboradorData, loader, handleColaboradorChange, handleCreateColaborador } = useFrom();

  return (
    <div
      className="bg-white text-[#0f2f4f]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Banner */}
      <section className=" px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Panel de Creación de colaborador
        </h1>
      </section>

      {/* Main */}
      <main className="w-full flex flex-col items-center justify-center min-h-75vh">
        <h2 className="text-center text-[#0f6ba8] text-2xl font-normal mb-8">
          Crear colaborador
        </h2>
        <form className="space-y-4 w-full max-w-md" onSubmit={handleCreateColaborador}>
          <input
            id="email"
            type="email"
            placeholder="Email del colaborador"
            value={colaboradorData.email}
            onChange={handleColaboradorChange}
            className="w-full input"
            disabled={loader}
            required
          />
          <input
            id="full_name"
            type="text"
            placeholder="Nombre completo"
            value={colaboradorData.full_name}
            onChange={handleColaboradorChange}
            className="w-full input"
            disabled={loader}
            required
          />
          <input
            id="team"
            type="text"
            placeholder="Equipo"
            value={colaboradorData.team}
            onChange={handleColaboradorChange}
            className="w-full input"
            disabled={loader}
            required
          />
          <input
            id="role"
            type="text"
            placeholder="Rol/Posición"
            value={colaboradorData.role}
            onChange={handleColaboradorChange}
            className="w-full input"
            disabled={loader}
            required
          />
          <button
            type="submit"
            className="w-full button"
            disabled={loader}
          >
            {loader ? 'Creando colaborador...' : 'Crear colaborador →'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreacionColaborador; 