import React, { useEffect, useState } from "react";

import { useFetch } from "./useFetch";

export const useMyCertificate = () => {
  const navigate = useNavigate();
  const {
    dataReconocimientos,
    loaderReconocimientos,
    fetchDataReconocimientos,
  } = useFetch();
  const [userEmail, setUserEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener el email del usuario desde localStorage
    try {
      const savedUserProfile = localStorage.getItem("userProfile");
      if (savedUserProfile) {
        const userData = JSON.parse(savedUserProfile);
        setUserProfile(userData);

        if (userData.email) {
          setUserEmail(userData.email);
          console.log("Email obtenido del localStorage:", userData.email);

          // Buscar certificados del usuario
          fetchDataReconocimientos(userData.email);
        } else {
          setError("No se encontró email en el perfil del usuario");
        }
      }
    } catch (err) {
      console.error("Error al cargar perfil desde localStorage:", err);
      setError("Error al cargar los datos del usuario");
      localStorage.removeItem("userProfile");
      navigate("/");
      setUserProfile(null);
      setUserEmail(null);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    dataReconocimientos,
    loaderReconocimientos,
    fetchDataReconocimientos,
    userEmail,
    userProfile,
    error,
  };
};
