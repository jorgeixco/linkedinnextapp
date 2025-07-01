import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export const useWelcome = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const { checkUserExists, userExists, setUserExists } = useFetch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const errorParam = urlParams.get("error");
    const userParam = urlParams.get("user");

    if (success === "true" && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        setUserProfile(userData);
        setError(null);
        console.log("Usuario autenticado:", userData);

        // Guardar en localStorage
        localStorage.setItem("userProfile", JSON.stringify(userData));

        // Verificar si el usuario existe en la base de datos
        if (userData.email) {
          setLoading(true);

          // Verificar primero si ya sabemos que existe desde localStorage
          if (userData.existsInDB) {
            console.log("Usuario ya confirmado como existente en localStorage");
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
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (err) {
        console.error("Error al parsear datos del usuario:", err);
        setError("Error al procesar los datos del usuario");
      }
    } else if (errorParam) {
      switch (errorParam) {
        case "oauth_error":
          setError("Error en la autorización de LinkedIn");
          break;
        case "no_code":
          setError("No se recibió código de autorización");
          break;
        case "auth_failed":
          setError("Error al procesar la autenticación");
          break;
        default:
          setError("Error desconocido en la autenticación");
      }

      // Limpiar los parámetros de la URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Si no hay parámetros de OAuth, intentar cargar desde localStorage
      try {
        const savedUserProfile = localStorage.getItem("userProfile");
        if (savedUserProfile) {
          const userData = JSON.parse(savedUserProfile);
          setUserProfile(userData);
          console.log("Usuario cargado desde localStorage:", userData);

          // Verificar si el usuario existe en la base de datos
          if (userData.email) {
            setLoading(true);

            // Verificar primero si ya sabemos que existe desde localStorage
            if (userData.existsInDB) {
              console.log(
                "Usuario ya confirmado como existente en localStorage (cargado)"
              );
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
        console.error("Error al cargar usuario desde localStorage:", err);
        // Limpiar localStorage corrupto
        localStorage.removeItem("userProfile");
      }
    }
  }, []);

  return {
    userProfile,
    error,
    loading,
    showCreateUser,
    userExists,
  };
};
