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
    isLinkedInLoading,
    isPDFGenerating,
  } = useSocialMedia();
  
  return (
    <div className="w-full" style={{ marginTop: "10px" }}>
      <div className="flex flex-row items-end justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#303131] font-[600] text-[1rem] ">COMPARTIR EN: </p>

          <div className="flex flex-row gap-2">
            <button
              onClick={() => handleLinkedInShare(certificate)}
              disabled={isLinkedInLoading}
              className={`flex items-center justify-center w-8 h-8 text-white rounded transition-colors ${
                isLinkedInLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#052948] hover:bg-[#070a0c]'
              }`}
              title={isLinkedInLoading ? "Procesando..." : "Compartir en LinkedIn"}
            >
              {isLinkedInLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LinkedInIcon size={16} />
              )}
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
          disabled={isPDFGenerating}
          className={`flex items-center justify-center w-8 h-8 text-white rounded transition-colors ${
            isPDFGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#052948] hover:bg-[#070a0c]'
          }`}
          title={isPDFGenerating ? "Generando PDF..." : "Descargar certificado"}
        >
          {isPDFGenerating ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <DownloadIcon size={16} />
          )}
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
