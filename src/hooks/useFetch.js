'use client';
import { useState } from "react";
import {
  transformDataCertType,
  transformDataPerson,
  transformDataReconocimientos,
  formatDateToSpanish,
} from "../utils/trasfromData";


export const useFetch = () => {
  const [dataPerson, setDataPerson] = useState([]);

  const [dataCertTypes, setDataCertTypes] = useState([]);
  const [dataReconocimientos, setDataReconocimientos] = useState([]);
  const [certificateData, setCertificateData] = useState(null);
  const [userExists, setUserExists] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loaderCertTypes, setLoaderCertTypes] = useState(false);
  const [loaderReconocimientos, setLoaderReconocimientos] = useState(false);
  const [loaderCertificate, setLoaderCertificate] = useState(false);

  const fetchDataCertTypes = async () => {
    try {
      setLoaderCertTypes(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/certType`
      );
      const data = await response.json();
      setDataCertTypes(transformDataCertType(data.result));
    } catch (error) {
      setDataCertTypes(transformDataCertType(mockCertTypes));
    } finally {
      setLoaderCertTypes(false);
    }
  };

  const fetchDataReconocimientos = async (email) => {
    try {
      setLoaderReconocimientos(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconocimiento/`
      );
      const data = await response.json();
      setDataReconocimientos(data.result);
    } catch (error) {
    } finally {
      setLoaderReconocimientos(false);
    }
  };

  const fetchCertificateById = async (id) => {
    try {
      setLoaderCertificate(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconocimiento/${id}`
      );
      const data = await response.json();
      setCertificateData(data.result);
      return certificateData;
    } catch (error) {
      setCertificateData(null);
      return certificateData;
    } finally {
      setLoaderCertificate(false);
    }
  };
  const checkUserExists = async (email) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}persona/${email}`
      );
      
      if (response.ok) {
        const userData = await response.json();
        setUserExists(true);

        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
          try {
            const profile = JSON.parse(savedProfile);
            const updatedProfile = {
              ...profile,
              existsInDB: true,
              dbData: userData.result,
              is_admin: userData.result.is_admin,
              is_enabled: userData.result.is_enabled,
            };
            localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
          } catch (err) {
            console.error("Error al actualizar localStorage:", err);
          }
        }

        return true;
      } else if (response.status === 404) {
        setUserExists(false);
        return false;
      } else { 
        throw new Error("Error al verificar usuario");
      }
    } catch (error) {
      console.error("Error al verificar si el usuario existe:", error);
      setError("Error al verificar el usuario en la base de datos");
      return false;
    }
  };

  const resetState = () => {
    setDataPerson(null);
    setDataCertTypes(null);
    setDataReconocimientos([]);
    setCertificateData(null);
    setLoader(false);
    setLoaderCertTypes(false);
    setLoaderReconocimientos(false);
    setLoaderCertificate(false);
  };

  return {
    dataPerson,
    dataCertTypes,
    dataReconocimientos,
    certificateData,
    loader,
    loaderCertTypes,
    loaderReconocimientos,
    loaderCertificate,
    setDataPerson,
    setDataCertTypes,
    setDataReconocimientos,
    setCertificateData,
    setLoader,
    setLoaderCertTypes,
    setLoaderReconocimientos,
    setLoaderCertificate,
    fetchDataCertTypes,
    fetchDataReconocimientos,
    fetchCertificateById,
    resetState,
    checkUserExists,
    userExists,
    setUserExists,
  };
};
