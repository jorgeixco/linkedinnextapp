'use client'
import React, { useEffect } from "react";
import { PreviewCertificate } from "../../components/PreviewCertificate";
import { useFetch } from "../../hooks/useFetch";
import "../../index.css";
import { SocialButtons } from "../../components/SocialButtons";

const MyCertificate = () => {
  const { dataReconocimientos, loaderReconocimientos, fetchDataReconocimientos } = useFetch();
  
  const userEmail = "jorgedavid23diaz@gmail.com"; // Email hardcodeado como solicitado

  useEffect(() => {
    fetchDataReconocimientos(userEmail);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div>
      <section className=" px-4 sm:px-6 md:px-10 py-4 panel-blue-royal flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Panel de mis certificados
        </h1>
      </section>
      <div
        className="flex justify-center items-center min-h-[80vh] "
        style={{
          margin: "20px",
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-5 w-[80%]">
          {loaderReconocimientos ? (
            <div className="text-center">
              <p>Cargando certificados...</p>
            </div>
          ) : dataReconocimientos.length === 0 ? (
            <div className="text-center">
              <p>No tienes certificados aún.</p>
            </div>
          ) : (
            dataReconocimientos.map((certificate) => (
              <div
                key={certificate.id}
                className="flex justify-center flex-col items-center bg-[#e9f7fe] w-[350px] h-[320px] rounded-lg shadow-md"
                style={{
                  padding: "10px 25px",
                }}
              >
                <PreviewCertificate
                  width="300px"
                  height="220px"
                  fontSizeParagraph="xs"
                  fontSizeTitle="2xl"
                  widthLogo="50%"
                  heightLogo="50%"
                  classBackground="background-image-black"
                  isPreview
                  name={certificate.name}
                  type={certificate.type}
                  id={certificate.id}
                  number={certificate.number}
                  date={certificate.date}
                />
                <SocialButtons certificate={certificate} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCertificate;
