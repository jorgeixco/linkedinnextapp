'use client';
import { useState } from "react";

export const useFrom = () => {
  const [data, setData] = useState({
    tipo: "",
    nombre: ""
  });

  const [assignmentData, setAssignmentData] = useState({
    email_persona: "",
    cert_type_id: ""
  });

  const [colaboradorData, setColaboradorData] = useState({
    email: "",
    full_name: "",
    team: "",
    role: ""
  });

  const [loader, setLoader] = useState(false);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCreateCertification = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/certType`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipo: data.tipo,
            nombre: data.nombre
          })
        }
      );
      
      setData({
        tipo: "",
        nombre: ""
      });
      return response.json();
    } catch (error) {
      console.error('Error', error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconocimiento`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_persona: assignmentData.email_persona,
            cert_type_id: parseInt(assignmentData.cert_type_id),
            meeting: ""
          })
        }
      );
      
      setAssignmentData({
        email_persona: "",
        cert_type_id: ""
      });
      console.log({response})
      return response.json();
    } catch (error) {
      console.error('Error al crear asignación:', error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/persona`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: colaboradorData.email,
            full_name: colaboradorData.full_name,
            url_image: "", // Dejamos vacío como solicitado
            team: colaboradorData.team,
            role: colaboradorData.role
          })
        }
      );
      
      setColaboradorData({
        email: "",
        full_name: "",
        team: "",
        role: ""
      });
      return response.json();
    } catch (error) {
      console.error('Error al crear colaborador:', error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  return {
    data,
    setData,
    assignmentData,
    setAssignmentData,
    colaboradorData,
    setColaboradorData,
    loader,
    handleChange,
    handleColaboradorChange,
    handleCreateCertification,
    handleCreateAssignment,
    handleCreateColaborador
  };
};
