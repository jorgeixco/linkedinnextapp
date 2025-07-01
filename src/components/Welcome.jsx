'use client'
import React, { useState, useEffect } from "react";
import { ButtonLogin } from "./ButtonLogin";
import CreateUser from "./CreateUser";

const Welcome = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [userExists, setUserExists] = useState(null);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
    setUserExists(null);
    setShowCreateUser(false);
    setError(null);
    console.log('Sesión cerrada');
  };

  // Función para verificar si el usuario existe en la base de datos
  const checkUserExists = async (email) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/persona/${encodeURIComponent(email)}`
      );
      
      if (response.ok) {
        const userData = await response.json();
        console.log('Usuario encontrado en la DB:', userData);
        setUserExists(true);
        
        // Actualizar localStorage para marcar que el usuario existe
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          try {
            const profile = JSON.parse(savedProfile);
            const updatedProfile = {
              ...profile,
              existsInDB: true,
              dbData: userData.result
            };
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            console.log('Perfil actualizado en localStorage con confirmación de existencia');
          } catch (err) {
            console.error('Error al actualizar localStorage:', err);
          }
        }
        
        return true;
      } else if (response.status === 404) {
        console.log('Usuario no encontrado en la DB');
        setUserExists(false);
        return false;
      } else {
        throw new Error('Error al verificar usuario');
      }
    } catch (error) {
      console.error('Error al verificar si el usuario existe:', error);
      setError('Error al verificar el usuario en la base de datos');
      return false;
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const errorParam = urlParams.get('error');
    const userParam = urlParams.get('user');
    
    if (success === 'true' && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        setUserProfile(userData);
        setError(null);
        console.log('Usuario autenticado:', userData);
        
        // Guardar en localStorage
        localStorage.setItem('userProfile', JSON.stringify(userData));
        
        // Verificar si el usuario existe en la base de datos
        if (userData.email) {
          setLoading(true);
          
          // Verificar primero si ya sabemos que existe desde localStorage
          if (userData.existsInDB) {
            console.log('Usuario ya confirmado como existente en localStorage');
            setUserExists(true);
            setLoading(false);
          } else {
            checkUserExists(userData.email).then((exists) => {
              if (!exists) {
                // Si no existe, mostrar el formulario de crear usuario
                setShowCreateUser(true);
              }
              setLoading(false);
            });
          }
        }
        
        // Limpiar los parámetros de la URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error('Error al parsear datos del usuario:', err);
        setError('Error al procesar los datos del usuario');
      }
    } else if (errorParam) {
      switch (errorParam) {
        case 'oauth_error':
          setError('Error en la autorización de LinkedIn');
          break;
        case 'no_code':
          setError('No se recibió código de autorización');
          break;
        case 'auth_failed':
          setError('Error al procesar la autenticación');
          break;
        default:
          setError('Error desconocido en la autenticación');
      }
      
      // Limpiar los parámetros de la URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Si no hay parámetros de OAuth, intentar cargar desde localStorage
      try {
        const savedUserProfile = localStorage.getItem('userProfile');
        if (savedUserProfile) {
          const userData = JSON.parse(savedUserProfile);
          setUserProfile(userData);
          console.log('Usuario cargado desde localStorage:', userData);
          
          // Verificar si el usuario existe en la base de datos
          if (userData.email) {
            setLoading(true);
            
            // Verificar primero si ya sabemos que existe desde localStorage
            if (userData.existsInDB) {
              console.log('Usuario ya confirmado como existente en localStorage (cargado)');
              setUserExists(true);
              setLoading(false);
            } else {
              checkUserExists(userData.email).then((exists) => {
                if (!exists) {
                  // Si no existe, mostrar el formulario de crear usuario
                  setShowCreateUser(true);
                }
                setLoading(false);
              });
            }
          }
        }
      } catch (err) {
        console.error('Error al cargar usuario desde localStorage:', err);
        // Limpiar localStorage corrupto
        localStorage.removeItem('userProfile');
      }
    }
  }, []);

  // Si necesita crear usuario, mostrar el formulario
  if (showCreateUser) {
    return <CreateUser userProfile={userProfile} />;
  }

  return (
    <div className="bg-white text-[#0f2f4f] font-['Inter',sans-serif]">
      <main className="w-full flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold text-[#0f6ba8] mb-4">
          Bienvenido a IXCOMERCIO
        </h1>
        
        {loading && (
          <p className="text-base font-normal mb-4 text-blue-600">
            Verificando información del usuario...
          </p>
        )}
        
        {error && (
          <p className="text-base font-normal mb-4 text-red-600">
            {error}
          </p>
        )}
        
                {userProfile && userExists === true && (
          <div className="text-center">
            <p className="text-base font-normal mb-8 text-green-600">
              ¡Bienvenido de nuevo, {userProfile.name || 'Usuario'}!
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Ya tienes acceso a tu panel de certificados.
            </p>
            <div className="space-y-2 mb-6">
              <a href="/my-certificate" className="block text-blue-600 hover:underline">
                Ver mis certificados
              </a>
              <a href="/crear-colaborador" className="block text-blue-600 hover:underline">
                Crear colaborador
              </a>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        )}
        
        {!userProfile && !loading && (
          <>
            <p className="text-base font-normal mb-8">
              Inicia sesión en LinkedIn para acceder a tu panel de certificados.
            </p>
            <ButtonLogin />
          </>
        )}
      </main>
    </div>
  );
};

export default Welcome; 