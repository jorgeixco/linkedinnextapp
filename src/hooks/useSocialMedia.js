"use client";
import { useState } from "react";

export const useSocialMedia = () => {
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  const [isPDFGenerating, setIsPDFGenerating] = useState(false);

  const handleLinkedInShare = async (certificate) => {
    const currentDate = new Date();

    const linkedinUsername = "me";

    const linkedinCertUrl = new URL(
      `https://www.linkedin.com/in/${linkedinUsername}/edit/forms/certification/new/`
    );

    linkedinCertUrl.searchParams.append("certId", certificate.id);
    linkedinCertUrl.searchParams.append(
      "certUrl",
      `${window.location.origin}/certificate/${certificate.id}`
    );
    linkedinCertUrl.searchParams.append("isFromA2p", "true");
    linkedinCertUrl.searchParams.append("issueMonth", currentDate.getMonth().toString());
    linkedinCertUrl.searchParams.append("issueYear", currentDate.getFullYear().toString());
    linkedinCertUrl.searchParams.append("name", certificate.type);
    linkedinCertUrl.searchParams.append("organizationName", "IXComercio");

    window.open(linkedinCertUrl.toString(), "_blank");
  };

  const processLinkedInShare = async (code, certificate) => {
    try {
      const response = await fetch("/api/linkedin/publication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          certificate,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();

      if (data.linkedinCertUrl) {
        window.open(data.linkedinCertUrl, "_blank");
      }
    } catch (error) {
      console.error("Error al procesar publicación en LinkedIn:", error);
    } finally {
      setIsLinkedInLoading(false);
      localStorage.removeItem("pendingLinkedInShare");
      localStorage.removeItem("linkedinOAuthState");
    }
  };

  const handleTwitterShare = (certificate) => {
    const certUrl = `${window.location.origin}/certificate/${certificate.id}`;
    const text = `¡Aprobé el certificado de ${certificate.type}! 🎉 #NuncaParesDeAprender`;

    const twitterUrl = new URL("https://x.com/intent/post");
    twitterUrl.searchParams.append("text", `${text} ${certUrl}`);

    window.open(twitterUrl.toString(), "_blank");
  };

  const handleDownload = async (certificate) => {
    try {
      setIsPDFGenerating(true);

      let fullCertificateData = certificate;

      if (!certificate.team || !certificate.role) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconocimiento/${certificate.id}`
          );
          const data = await response.json();
          fullCertificateData = {
            ...certificate,
            team: data.result.team,
            role: data.result.role,
          };
        } catch (error) {
          console.error("Error fetching full certificate data:", error);
        }
      }

      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      // Crear HTML del certificado directamente
      const certificateHTML = `
          <div style="
            width: 1200px;
            height: 800px;
            position: relative;
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/background.png');
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 16px;
            text-align: center;
            padding: 40px;
          ">
                             <img src="/assets/ixcomerciofooter.png" alt="IX Comercio Logo" style="
                 width: 25%;
                 height: 10%;
                 margin-bottom: 8px;
                 filter: brightness(0) invert(1);
               " />
              
              <h1 style="color: #ffffff; font-weight: bold; font-size: 34px; margin: 8px 0;">
                ${fullCertificateData.name}
              </h1>
              <p style="color: #ffffff; font-size: 24px; margin: 4px 0;">
                Ha obtenido el reconocimiento de
              </p>
              <h2 style="color: #ffffff; font-size: 34px; font-weight: bold; margin: 8px 0;">
                ${fullCertificateData.type}
              </h2>
              <p style="color: #d1d5db; font-size: 18px; margin: 4px 0;">
                ${fullCertificateData.id}
              </p>
              <p style="color: #ffffff; font-size: 24px; margin: 8px 0;">
                ${fullCertificateData.date}
              </p>
          </div>
      `;

      // Crear un elemento temporal para renderizar el certificado
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "-9999px";
      tempDiv.style.width = "1200px";
      tempDiv.style.height = "800px";
      tempDiv.style.backgroundColor = "white";
      tempDiv.innerHTML = certificateHTML;
      document.body.appendChild(tempDiv);

      // Esperar un poco para que se renderice completamente
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capturar el elemento como imagen
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 1200,
        height: 800,
      });

      // Crear el PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 297; // A4 landscape width in mm
      const pdfHeight = 210; // A4 landscape height in mm

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      // Descargar el PDF
      pdf.save(
        `certificado-${fullCertificateData.name.replace(/\s+/g, "-")}-${
          fullCertificateData.id
        }.pdf`
      );

      // Limpiar el elemento temporal
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setIsPDFGenerating(false);
    }
  };

  const handleCopyLink = (certificate) => {
    const url = `${window.location.origin}/certificate/${certificate.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Enlace copiado al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar el enlace:", err);
      });
  };

  return {
    handleLinkedInShare,
    handleTwitterShare,
    handleDownload,
    handleCopyLink,
    isLinkedInLoading,
    isPDFGenerating,
  };
};
