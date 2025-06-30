'use client'
import React, { useState, useEffect } from "react";
import { ButtonLogin } from "../components/ButtonLogin";

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      setLoading(true);
      fetch('/api/linkedin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del backend:', data);
        setUserProfile(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error al enviar código:', error);
        setError('Error al procesar la autenticación');
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, []);
  
  return (
    <div className="bg-white text-[#0f2f4f] font-['Inter',sans-serif]">

      <main className="w-full flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold text-[#0f6ba8] mb-4">
          Bienvenido a IXCOMERCIO
        </h1>
        
        {loading && (
          <p className="text-base font-normal mb-4 text-blue-600">
            Procesando autenticación...
          </p>
        )}
        
        {error && (
          <p className="text-base font-normal mb-4 text-red-600">
            {error}
          </p>
        )}
        
        {userProfile ? (
          <p className="text-base font-normal mb-8 text-green-600">
            ¡Autenticación exitosa! Bienvenido {userProfile.name || 'Usuario'}.
          </p>
        ) : (
          <p className="text-base font-normal mb-8">
            Inicia sesión en LinkedIn para acceder a tu panel de certificados.
          </p>
        )}
        
        {!userProfile && !loading && <ButtonLogin />}
      </main>
    </div>
  );
};

export default Home;