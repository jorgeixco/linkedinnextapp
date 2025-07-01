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
  const [currentUserProfile, setCurrentUserProfile] = useState(userProfile);

  // Pre-rellenar datos cuando se recibe el perfil de LinkedIn o desde localStorage
  useEffect(() => {
    let profileData = userProfile;
    
    // Si no se recibió userProfile como prop, intentar cargar desde localStorage
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
    
    setCurrentUserProfile(profileData);
    
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

  const handleCreateColaborador = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      setError(null);
      
      const response = await fetch('/api/persona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: colaboradorData.email,
          full_name: colaboradorData.full_name,
          url_image: currentUserProfile?.picture || "", // Usar la imagen de LinkedIn si está disponible
          team: colaboradorData.team,
          role: colaboradorData.role
        })
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el colaborador');
      }
      
      const result = await response.json();
      
      // Actualizar localStorage para indicar que el usuario ya existe en la DB
      if (currentUserProfile) {
        const updatedProfile = {
          ...currentUserProfile,
          existsInDB: true,
          dbData: result.result // Guardar los datos completos de la DB
        };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        console.log('Perfil actualizado en localStorage:', updatedProfile);
      }
      
      setSuccess(true);
      
      // Redirigir a la página principal después de 2 segundos
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    } catch (error) {
      console.error('Error al crear colaborador:', error);
      setError('Error al crear el colaborador. Por favor, intenta de nuevo.');
    } finally {
      setLoader(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white text-[#0f2f4f]" style={{ fontFamily: "Inter, sans-serif" }}>
        <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
          <h1 className="text-xl font-semibold">¡Bienvenido a IXCOMERCIO!</h1>
        </section>
        <main className="w-full flex flex-col items-center justify-center min-h-[75vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              ¡Colaborador creado exitosamente!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Bienvenido {colaboradorData.full_name}
            </p>
            <p className="text-sm text-gray-500">
              Serás redirigido a la página principal en unos segundos...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#0f2f4f]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Banner */}
      <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          {currentUserProfile ? 'Completar Registro' : 'Panel de Creación de Colaborador'}
        </h1>
      </section>

      {/* Main */}
      <main className="w-full flex flex-col items-center justify-center min-h-[75vh]">
        <div className="w-full max-w-md">
          <h2 className="text-center text-[#0f6ba8] text-2xl font-normal mb-4">
            {currentUserProfile ? `¡Hola ${currentUserProfile.name || 'Usuario'}!` : 'Crear colaborador'}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {currentUserProfile 
              ? 'Para completar tu registro, necesitamos algunos datos adicionales'
              : 'Completa la información del nuevo colaborador'
            }
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleCreateColaborador}>
            <input
              id="email"
              type="email"
              placeholder="Email del colaborador"
              value={colaboradorData.email}
              onChange={handleColaboradorChange}
              className={`w-full input ${currentUserProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentUserProfile !== null} // Solo deshabilitado si viene de LinkedIn
              required
            />
            <input
              id="full_name"
              type="text"
              placeholder="Nombre completo"
              value={colaboradorData.full_name}
              onChange={handleColaboradorChange}
              className={`w-full input ${currentUserProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentUserProfile !== null} // Solo deshabilitado si viene de LinkedIn
              required
            />
            <input
              id="team"
              type="text"
              placeholder="Equipo (ej: Desarrollo, Marketing, RRHH)"
              value={colaboradorData.team}
              onChange={handleColaboradorChange}
              className="w-full input"
              disabled={loader}
              required
            />
            <input
              id="role"
              type="text"
              placeholder="Rol/Posición (ej: Desarrollador, Diseñador, Team Lead)"
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
              {loader 
                ? 'Creando colaborador...' 
                : currentUserProfile 
                  ? 'Completar registro →' 
                  : 'Crear colaborador →'
              }
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateUser; 