import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      style={{
        backgroundColor: "#0f2f4f",
        color: "white",
        height: "56px",
        display: "flex",
        alignItems: "center",
        padding: "0rem",
      }}
    >
      <span className="text-[#bbbbbb] text-base font-normal tracking-tight ml-1 text-center justify-center flex w-full">
        © {currentYear} IXComercio • Todos los derechos reservados
      </span>
    </footer>
  );
};