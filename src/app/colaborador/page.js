'use client'
import React, { useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import { useFetch } from "../../hooks/useFetch";
import { useFrom } from "../../hooks/useFrom";

const AsignarColaborador = () => {
  const {
    dataPerson,
    dataCertTypes,
    loader,
    loaderCertTypes,
    fetchDataPerson,
    fetchDataCertTypes,
  } = useFetch();

  const { handleCreateAssignment, setAssignmentData, assignmentData } = useFrom();

  useEffect(() => {
    fetchDataPerson();
    fetchDataCertTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white text-[#0f2f4f] font-['Inter',sans-serif]">
      <section className=" px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Panel de asignación de colaborador
        </h1>
      </section>

      <main className="w-full flex flex-col items-center justify-center min-h-75vh">
        <h2 className="text-center text-[#0f6ba8] text-2xl font-normal mb-8">
          Asignación de certificado
        </h2>

        <form className="space-y-4 w-full max-w-md" onSubmit={handleCreateAssignment}>
          <Dropdown
            data={dataPerson}
            value={assignmentData.email_persona}
            onChange={(value) => setAssignmentData((prev) => ({ ...prev, email_persona: value }))}
            placeholder={
              loader ? "Cargando colaboradores..." : "Seleccione un colaborador"
            }
          />
          <Dropdown
            data={dataCertTypes}
            value={assignmentData.cert_type_id}
            onChange={(value) => setAssignmentData((prev) => ({ ...prev, cert_type_id: value }))}
            placeholder={
              loaderCertTypes
                ? "Cargando tipos de certificado..."
                : "Seleccione el tipo de certificado"
            }
          />
          <button
            type="submit"
            className="button w-full"
            disabled={loader || loaderCertTypes}
          >
            {loader ? "Creando certificado..." : "Crear certificado →"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AsignarColaborador;
