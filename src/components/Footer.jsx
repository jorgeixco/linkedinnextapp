import React from "react";

export const Footer = () => {
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
        <span className="text-white text-xl font-normal tracking-tight ml-1">
          <img src={'/assets/ixcomerciofooter.png'} alt="Logo IXCOMERCIO blanco y azul" width={150} />
        </span>
      </footer>
    
  );
};