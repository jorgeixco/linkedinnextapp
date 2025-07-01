"use client";
import React, { useState, useEffect } from "react";
import { ButtonLogin } from "./ButtonLogin";
import CreateUser from "./CreateUser";
import { useFetch } from "../hooks/useFetch";
import { useWelcome } from "../hooks/useWelcome";

const Welcome = () => {
  const { userProfile, loading, error, showCreateUser, userExists } =
    useWelcome();
  if (showCreateUser) {
    return <CreateUser userProfile={userProfile} />;
  }

  return (
    <div className="bg-white text-[#0f2f4f] font-['Inter',sans-serif]">
      <main className="w-full flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold text-[#0f6ba8] mb-4">
          Bienvenido a IXCOMERCIO
        </h1>

        {loading && (
          <p className="text-base font-normal mb-4 text-blue-600">
            Verificando información del usuario...
          </p>
        )}

        {error && (
          <p className="text-base font-normal mb-4 text-red-600">{error}</p>
        )}

        {userProfile && userExists === true && (
          <>
            <div className="text-center">
              <p className="text-base font-normal mb-8 text-green-600">
                ¡Bienvenido de nuevo, {userProfile.name || "Usuario"}!
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Ya tienes acceso a tu panel de certificados.
              </p>
              <div className="space-y-2 mb-6">
                <a
                  href="/my-certificate"
                  className="block text-[#0f6ba8] hover:underline"
                >
                  Ver mis certificados
                </a>
              </div>
            </div>
          </>
        )}

        {!userProfile && !loading && (
          <>
            <p className="text-base font-normal mb-8">
              Inicia sesión en LinkedIn para acceder a tu panel de certificados.
            </p>
            <ButtonLogin />
          </>
        )}
      </main>
    </div>
  );
};

export default Welcome;
