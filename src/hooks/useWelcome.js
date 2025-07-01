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

        localStorage.setItem("userProfile", JSON.stringify(userData));

        if (userData.email) {
          setLoading(true);

          if (userData.existsInDB) {
            setUserExists(true);
            setLoading(false);
          } else {
            checkUserExists(userData.email).then((exists) => {
              if (!exists) {
                setShowCreateUser(true);
              }
              setLoading(false);
            });
          }
        }

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (err) {
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

      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      try {
        const savedUserProfile = localStorage.getItem("userProfile");
        if (savedUserProfile) {
          const userData = JSON.parse(savedUserProfile);
          setUserProfile(userData);

          if (userData.email) {
            setLoading(true);

            if (userData.existsInDB) {
              setUserExists(true);
              setLoading(false);
            } else {
              checkUserExists(userData.email).then((exists) => {
                if (!exists) {
                  setShowCreateUser(true);
                }
                setLoading(false);
              });
            }
          }
        }
      } catch (err) {
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
