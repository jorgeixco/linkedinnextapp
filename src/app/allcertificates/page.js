'use client'
import React, { useEffect, useState } from "react";
import { PreviewCertificate } from "../../components/PreviewCertificate";
import { useFetch } from "../../hooks/useFetch";
import "../../index.css";
import { SocialButtons } from "../../components/SocialButtons";

const MyCertificate = () => {
  const { dataReconocimientos, loaderReconocimientos, fetchDataReconocimientos } = useFetch();
  const [userEmail, setUserEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener el email del usuario desde localStorage
    try {
      const savedUserProfile = localStorage.getItem('userProfile');
      if (savedUserProfile) {
        const userData = JSON.parse(savedUserProfile);
        setUserProfile(userData);
        
        if (userData.email) {
          setUserEmail(userData.email);
          console.log('Email obtenido del localStorage:', userData.email);
          
          // Buscar certificados del usuario
          fetchDataReconocimientos(userData.email);
        } else {
          setError('No se encontró email en el perfil del usuario');
        }
      } else {
        setError('No hay usuario autenticado. Por favor, inicia sesión.');
      }
    } catch (err) {
      console.error('Error al cargar perfil desde localStorage:', err);
      setError('Error al cargar los datos del usuario');
      // Limpiar localStorage corrupto
      localStorage.removeItem('userProfile');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // Si hay error de autenticación, mostrar mensaje
  if (error) {
    return (
      <div>
        <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
          <h1 className="text-xl font-semibold">
            Panel de Certificados
          </h1>
        </section>
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Error de autenticación
            </h2>
            <p className="text-red-600 mb-6">
              {error}
            </p>
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
        <h1 className="text-xl font-semibold">
          Certificados
        </h1>
      </section>
      <div
        className="flex justify-center items-center min-h-[80vh]"
        style={{
          margin: "20px",
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-5 w-[80%]">
          {!userEmail ? (
            <div className="text-center">
              <p>Verificando usuario...</p>
            </div>
          ) : loaderReconocimientos ? (
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
