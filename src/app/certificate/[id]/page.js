'use client'
import React, { useEffect, useState  } from "react"; 
import { useFetch } from "../../../hooks/useFetch";
import { PreviewCertificate } from "../../../components/PreviewCertificate";
import { Footer } from "../../../components/Footer";
import Image from 'next/image';
import logo from "../../../../public/assets/ixcomercio.png";
import "../../../index.css";
import { useParams } from "next/navigation";
import { formatDateToSpanish, transformDataReconocimientos } from "@/utils/trasfromData";
import { LinkedInIcon } from "@/components/SocialIcons";
import { useSocialMedia } from "@/hooks/useSocialMedia";

const PublicCertificate = () => {
  const { id } = useParams();
  const { certificateData, loaderCertificate, fetchCertificateById } = useFetch();
  const { handleLinkedInShare } = useSocialMedia();
  const [dataToLinkedIn, setDataToLinkedIn] = useState(null);
  useEffect(() => {
    if (id) {
      fetchCertificateById(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
useEffect(() => {
  if(certificateData){
    setDataToLinkedIn(transformDataReconocimientos(certificateData));
  }
}, [certificateData]);
  if (loaderCertificate) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Logo Header */}
        <header className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal">
          <div className="flex justify-center">
            <Image src={logo} alt="Logo de la empresa" className="h-10" />
          </div>
        </header>

        {/* Loading Content */}
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-[#0f2f4f]">Cargando certificado...</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!certificateData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Logo Header */}
        <header className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal">
          <div className="flex justify-center">
            <Image src={logo} alt="IX Comercio" className="h-10" />
          </div>
        </header>

        {/* Error Content */}
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#0f2f4f] mb-4">
              Certificado no encontrado
            </h2>
            <p className="text-lg text-gray-600">
              El certificado que buscas no existe o ha sido eliminado.
            </p>
          </div>
        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo Header */}
      <header className="px-4 sm:px-6 md:px-10 py-4 panel-blue-royal">
        <div className="flex justify-center">
          <Image src={logo} alt="IX Comercio" className="h-11" />
        </div>
      </header>

      {/* Certificate Content */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-4xl w-full px-4 flex flex-col items-center justify-center">
          <div className="text-center mb-8" style={{ margin: "10px" }}>
            <h1 className="text-3xl font-bold text-[#0f2f4f] mb-2">
              Certificado de Reconocimiento
            </h1>
            <p className="text-lg text-gray-600">
              {certificateData.name} - {certificateData.type}
            </p>
          </div>

          <div className="flex justify-center w-[80%]">
            <PreviewCertificate
              width="100%"
              height="400px"
              fontSizeParagraph="lg"
              fontSizeTitle="1.5rem"
              widthLogo="40%"
              heightLogo="40%"
              classBackground="background-image-black"
              isPreview={false}
              name={certificateData.name}
              type={certificateData.type}
              id={certificateData.id}
              date={certificateData.date}
              rounded
            />
          </div>

          <div
            className="text-center w-[80%] shadow-md rounded-lg"
            style={{ margin: "20px 0px" }}
          >
            <div className="bg-gray-50 rounded-lg p-6 w-full">
              <h3
                className="text-xl font-semibold text-[#0f2f4f] mb-4"
                style={{ padding: "10px" }}
              >
                Detalles del Reconocimiento
              </h3>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
                style={{ padding: "10px" }}
              >
                <div>
                  <p className="text-sm text-gray-600">Colaborador:</p>
                  <p className="font-medium text-[#0f2f4f]">
                    {certificateData.nombre_colaborador}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Tipo de Reconocimiento:
                  </p>
                  <p className="font-medium text-[#0f2f4f]">
                    {certificateData.cert_type_nombre}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de obtención:</p>
                  <p className="font-medium text-[#0f2f4f]">
                    {formatDateToSpanish(certificateData.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de obtención:</p>
                  <button
                    onClick={() => handleLinkedInShare(dataToLinkedIn)}
                    className={`flex items-center justify-center w-8 h-8 text-white rounded transition-colors bg-[#052948] hover:bg-[#070a0c]`}
                    title={
                        "Compartir en LinkedIn"
                    }
                  >
                    <LinkedInIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicCertificate;