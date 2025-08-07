'use client'
import React, { useState, useEffect } from "react";

const CreateUser = ({ userProfile }) => {
  const [colaboradorData, setColaboradorData] = useState({
    email: "",
    full_name: "",
    team: "",
    role: ""
  });
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let profileData = userProfile;
    
    if (!profileData) {
      try {
        const savedUserProfile = localStorage.getItem('userProfile');
        if (savedUserProfile) {
          profileData = JSON.parse(savedUserProfile);
          console.log('Perfil cargado desde localStorage para CreateUser:', profileData);
        }
      } catch (err) {
        console.error('Error al cargar perfil desde localStorage:', err);
      }
    }
    
    
    if (profileData) {
      setColaboradorData({
        email: profileData.email || "",
        full_name: profileData.name || "",
        team: "",
        role: ""
      });
    }
  }, [userProfile]);

  const handleColaboradorChange = (e) => {
    const { id, value } = e.target;
    setColaboradorData(prev => ({
      ...prev,
      [id]: value
    }));
  };


  


  if (success) {
    return (
      <div
        className="bg-white text-[#0f2f4f]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
          <h1 className="text-xl font-semibold">¡Bienvenido a IXCOMERCIO!</h1>
        </section>
        <main className="w-full flex flex-col items-center justify-center min-h-[75vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#0f6ba8] mb-4">
              Registro exitoso
            </h2>
            <p className="text-lg text-gray-500 mb-4">
              Se envió un correo al administrador para aprobar su acceso.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#0f2f4f]" style={{ fontFamily: "Inter, sans-serif" }}>
      <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Panel de Creación de Colaborador
        </h1>
      </section>

      <main className="w-full flex flex-col items-center justify-center min-h-[75vh]">
        <div className="w-full max-w-md">
          <h2 className="text-center text-[#0f6ba8] text-2xl font-normal mb-4">
            Crear colaborador
          </h2>
          <p className="text-center text-gray-600 mb-8"> 
            Completa la información del nuevo colaborador
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateUser; 