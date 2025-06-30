'use client'
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import logo from "../../public/assets/ixcomercio.png";
import "./Navbar.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          <Link href="/certificacion" className="navbar-link">
            Crear certificación
          </Link>
          <Link href="/crear-colaborador" className="navbar-link">
            Crear colaborador
          </Link>
          <Link href="/colaborador" className="navbar-link">
            Asignar a un colaborador
          </Link>
          <Link href="/my-certificate" className="navbar-link">
            Mis certificados
          </Link>
          <Link href="/perfil" className="navbar-link">
            <div className="flex items-center space-x-2 border border-[#0f2f4f] rounded-full px-2 py-0-5 text-xs text-[#0f2f4f]">
              <i className="fas fa-user-circle text-lg"></i>
              <span>Admin</span>
            </div>
          </Link>
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