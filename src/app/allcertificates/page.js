"use client";
import React, { useEffect, useState } from "react";
import { PreviewCertificate } from "../../components/PreviewCertificate";
import { useFetch } from "../../hooks/useFetch";
import "../../index.css";
import { SocialButtons } from "../../components/SocialButtons";

const MyCertificate = () => {
  const {
    dataReconocimientos,
    loaderReconocimientos,
    fetchDataReconocimientos,
  } = useFetch();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataReconocimientos();
  }, []);

  if (error) {
    return (
      <div>
        <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
          <h1 className="text-xl font-semibold">Panel de Certificados</h1>
        </section>
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Error de autenticación
            </h2>
            <p className="text-red-600 mb-6">{error}</p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Ir al inicio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">Certificados</h1>
      </section>
      <div
        className="flex justify-center items-center min-h-[80vh]"
        style={{
          margin: "20px",
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-5 w-[80%]">
          {loaderReconocimientos ? (
            <div className="text-center">
              <p>Cargando certificados...</p>
            </div>
          ) : dataReconocimientos.length === 0 ? (
            <div
              className="text-center bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md"
              style={{ padding: "20px" }}
            >
              <h2 className="text-xl font-semibold text-gray-600 mb-4">
                Sin certificados
              </h2>
              <p className="text-gray-600 mb-6">
                Aún no tienes certificados asignados.
              </p>
            </div>
          ) : (
            dataReconocimientos.map((certificate) => (
              <div
                key={certificate.id}
                className="flex justify-center flex-col items-center bg-[#e9f7fe] w-[350px] h-[320px] rounded-lg shadow-md"
                style={{
                  padding: "10px 25px",
                }}
              >
                <PreviewCertificate
                  width="300px"
                  height="220px"
                  fontSizeParagraph="xs"
                  fontSizeTitle="2xl"
                  widthLogo="50%"
                  heightLogo="50%"
                  classBackground="background-image-black"
                  isPreview
                  name={certificate.name}
                  type={certificate.type}
                  id={certificate.id}
                  number={certificate.number}
                  date={certificate.date}
                />
                <SocialButtons certificate={certificate} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCertificate;
