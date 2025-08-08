'use client'
import React from "react";
import Image from 'next/image';
import logo from "../../public/assets/ixcomerciofooter.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { formatDateToSpanish } from "@/utils/trasfromData";

export const PreviewCertificate = ({
  width,
  height,
  fontSizeParagraph,
  fontSizeTitle,
  checkIcon,
  widthLogo,
  heightLogo,
  classBackground,
  isPreview,
  nombre_colaborador,
  cert_type_nombre,
  id,
  date,
  rounded,
}) => {
  return (
    <section
      className={`${classBackground} image-properties ${
        rounded ? "rounded-md" : ""
      }`}
      style={{ width: width, height: height }}
    >
      {checkIcon && (
        <div className="flex flex-col h-auto w-full justify-start items-start">
          <CheckCircleOutlineIcon
            className="text-white cursor-pointer"
            sx={{ fontSize: 30 }}
            style={{ marginLeft: "10px", marginTop: "10px" }}
          />
        </div>
      )}
      <div
        className={`flex flex-col ${
          checkIcon ? "h-[80%]" : "h-full"
        } w-full justify-center items-center gap-2 `}
      >
        <Image src={logo} alt="" width={widthLogo} height={heightLogo} />
        <h1
          className={`text-white font-bold text-center`}
          style={{ fontSize: fontSizeTitle }}
        >
          {nombre_colaborador}
        </h1>
        <p
          className={`text-white text-center`}
          style={{ fontSize: fontSizeParagraph }}
        >
          Ha obtenido el reconocimiento de
        </p>
        <h2
          className={`text-white text-center`}
          style={{ fontSize: fontSizeTitle }}
        >
          {cert_type_nombre}
        </h2>
        {!isPreview && (
          <>
            <p
              className={`text-[#bab7b7] text-center`}
              style={{ fontSize: fontSizeParagraph }}
            >
              {id}
            </p>
            <p
              className={`text-white text-center`}
              style={{ fontSize: fontSizeParagraph }}
            >
              {formatDateToSpanish(date)}
            </p>
          </>
        )}
      </div>
    </section>
  );
};
