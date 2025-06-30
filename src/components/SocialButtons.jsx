'use client'
import React from "react";
import { useSocialMedia } from "../hooks/useSocialMedia";
import {
  LinkedInIcon,
  TwitterIcon,
  DownloadIcon,
  CopyLinkIcon,
} from "./SocialIcons";

export const SocialButtons = ({ certificate }) => {
  const {
    handleLinkedInShare,
    handleTwitterShare,
    handleDownload,
    handleCopyLink,
  } = useSocialMedia();
  return (
    <div className="w-full" style={{ marginTop: "10px" }}>
      <div className="flex flex-row items-end justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#303131] font-[600] text-[1rem] ">COMPARTIR EN: </p>

          <div className="flex flex-row gap-2">
            <button
              onClick={() => handleLinkedInShare(certificate)}
              className="flex items-center justify-center w-8 h-8 bg-[#052948] text-white rounded hover:bg-[#070a0c] transition-colors"
              title="Compartir en LinkedIn"
            >
              <LinkedInIcon size={16} />
            </button>

            <button
              onClick={() => handleTwitterShare(certificate)}
              className="flex items-center justify-center w-8 h-8 bg-[#052948] text-white rounded hover:bg-[#070a0c] transition-colors"
              title="Compartir en Twitter"
            >
              <TwitterIcon size={16} />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end">

        <button
          onClick={() => handleDownload(certificate)}
          className="flex items-center justify-center w-8 h-8 bg-[#052948] text-white rounded hover:bg-[#070a0c] transition-colors"
          title="Descargar certificado"
        >
          <DownloadIcon size={16} />
        </button>

        <button
          onClick={() => handleCopyLink(certificate)}
          className="flex items-center justify-center w-8 h-8 bg-[#052948] text-white rounded hover:bg-[#070a0c] transition-colors"
          title="Copiar enlace"
        >
            <CopyLinkIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
