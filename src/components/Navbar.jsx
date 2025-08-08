"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/ixcomercio.png";
import "./Navbar.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    try {
      const savedUserProfile = localStorage.getItem("userProfile");
      if (savedUserProfile) {
        setUserProfile(JSON.parse(savedUserProfile));
      }
    } catch (error) {
      console.error("Error al cargar perfil desde localStorage:", error);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Image src={logo} alt="logo" />
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link href="/" className="navbar-link">
            Inicio
          </Link>

          <Link href="/createceritification" className="navbar-link">
            Crear certificación
          </Link>

          <Link href="/colaborador" className="navbar-link">
            Asignar a un colaborador
          </Link>

          <Link href="/allcertificates" className="navbar-link">
            Certificados
          </Link>
          <div className="flex items-center space-x-2 border border-[#0f2f4f] rounded-full text-xs text-[#0f2f4f] w-[50px] h-[30px] text-center justify-center">
            <span>Admin</span>
          </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
};
