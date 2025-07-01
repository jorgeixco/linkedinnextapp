'use client'
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Dropdown from "../../../components/Dropdown";

const ActivarUsuario = () => {
  const params = useParams();
  const router = useRouter();
  const email = params.email;
  
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    is_enabled: "",
    is_admin: ""
  });

  // Datos para los dropdowns de Sí/No
  const yesNoOptions = [
    { id: "true", title: "Sí", subtitle: "", subValue: "" },
    { id: "false", title: "No", subtitle: "", subValue: "" }
  ];

  // Verificar si el usuario actual es administrador
  useEffect(() => {
    try {
      const savedUserProfile = localStorage.getItem("userProfile");
      if (savedUserProfile) {
        const profile = JSON.parse(savedUserProfile);
        setUserProfile(profile);
        
        if (!profile.is_admin) {
          router.push('/');
          return;
        }
      } else {
        router.push('/');
        return;
      }
    } catch (error) {
      console.error("Error al cargar perfil desde localStorage:", error);
      router.push('/');
    }
  }, [router]);

  // Cargar datos del usuario a activar
  useEffect(() => {
    if (email && userProfile?.is_admin) {
      fetchUserData();
    }
  }, [email, userProfile]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/persona/${encodeURIComponent(email)}`);
      
      if (response.ok) {
        const data = await response.json();
        setUserData(data.result);
        setFormData({
          is_enabled: data.result.is_enabled ? "true" : "false",
          is_admin: data.result.is_admin ? "true" : "false"
        });
      } else if (response.status === 404) {
        setError("Usuario no encontrado");
      } else {
        setError("Error al cargar los datos del usuario");
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.is_enabled || !formData.is_admin) {
      setError("Ambos campos son requeridos");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/persona/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: userData.full_name,
          url_image: userData.url_image,
          team: userData.team,
          role: userData.role,
          is_enabled: formData.is_enabled === "true",
          is_admin: formData.is_admin === "true"
        })
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      
      setSuccess(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setError('Error al actualizar el usuario. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Verificar si el usuario actual es administrador
  if (!userProfile?.is_admin) {
    return (
      <div className="bg-white text-[#0f2f4f]" style={{ fontFamily: "Inter, sans-serif" }}>
        <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
          <h1 className="text-xl font-semibold">Acceso Denegado</h1>
        </section>
        <main className="w-full flex flex-col items-center justify-center min-h-[75vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              No tienes permisos para acceder a esta página
            </h2>
            <p className="text-lg text-gray-600">
              Solo los administradores pueden activar usuarios.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-white text-[#0f2f4f]" style={{ fontFamily: "Inter, sans-serif" }}>
        <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
          <h1 className="text-xl font-semibold">¡Usuario Actualizado!</h1>
        </section>
        <main className="w-full flex flex-col items-center justify-center min-h-[75vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Usuario actualizado exitosamente
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Los cambios se han guardado correctamente
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
      <section className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">Administrar Usuario</h1>
      </section>

      <main className="w-full flex flex-col items-center justify-center min-h-[75vh]">
        <div className="w-full max-w-md">
          <h2 className="text-center text-[#0f6ba8] text-2xl font-normal mb-4">
            Activar y administrar usuario
          </h2>
          
          {userData && (
            <div className="bg-gray-50 p-4 rounded mb-6">
              <h3 className="font-semibold text-lg mb-2">Información del usuario:</h3>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Nombre:</strong> {userData.full_name}</p>
              <p><strong>Equipo:</strong> {userData.team}</p>
              <p><strong>Rol:</strong> {userData.role}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading && !userData ? (
            <div className="text-center">
              <p>Cargando datos del usuario...</p>
            </div>
          ) : userData ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activar usuario *
                </label>
                <Dropdown
                  data={yesNoOptions}
                  value={formData.is_enabled}
                  onChange={(value) => setFormData(prev => ({ ...prev, is_enabled: value }))}
                  placeholder="Seleccione Sí o No"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Es administrador *
                </label>
                <Dropdown
                  data={yesNoOptions}
                  value={formData.is_admin}
                  onChange={(value) => setFormData(prev => ({ ...prev, is_admin: value }))}
                  placeholder="Seleccione Sí o No"
                />
              </div>
              
              <button
                type="submit"
                className="w-full button"
                disabled={loading || !formData.is_enabled || !formData.is_admin}
              >
                {loading ? 'Actualizando usuario...' : 'Actualizar usuario →'}
              </button>
            </form>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default ActivarUsuario;
