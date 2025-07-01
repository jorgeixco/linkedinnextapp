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

  const fetchDataPerson = async () => {
    try {
      setLoader(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/persona`
      );
      const data = await response.json();
      setDataPerson(transformDataPerson(data.result));
    } catch (error) {
      console.error("Error", error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const fetchDataCertTypes = async () => {
    try {
      setLoaderCertTypes(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/certType`
      );
      const data = await response.json();
      setDataCertTypes(transformDataCertType(data.result));
    } catch (error) {
      console.error("Error fetching certificate types", error);
      throw error;
    } finally {
      setLoaderCertTypes(false);
    }
  };

  const fetchDataReconocimientos = async (email) => {
    try {
      setLoaderReconocimientos(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconocimiento/email/${email}`
      );
      const data = await response.json();
      setDataReconocimientos(transformDataReconocimientos(data.result));
    } catch (error) {
      console.error("Error fetching reconocimientos", error);
      throw error;
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
      const certificateData = {
        id: data.result.id,
        name: data.result.full_name,
        type: data.result.cert_type_nombre,
        meeting: data.result.meeting,
        date: formatDateToSpanish(data.result.created_at),
        cert_type_tipo: data.result.cert_type_tipo,
        team: data.result.team,
        role: data.result.role,
      };
      setCertificateData(certificateData);
      return certificateData;
    } catch (error) {
      console.error("Error fetching certificate", error);
      throw error;
    } finally {
      setLoaderCertificate(false);
    }
  };
  const checkUserExists = async (email) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/persona/${encodeURIComponent(
          email
        )}`
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
    fetchDataPerson,
    fetchDataCertTypes,
    fetchDataReconocimientos,
    fetchCertificateById,
    resetState,
    checkUserExists,
    userExists,
    setUserExists,
  };
};
