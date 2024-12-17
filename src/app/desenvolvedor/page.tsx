// src/app/developer/page.tsx

"use client";
import { useEffect, useState } from "react";
import {
  getAccessToken,
  decodeToken,
  verifyTokenSignature,
} from "../../lib/auth";

interface JwtPayload {
  role: string;
  username: string;
}

export default function DeveloperPage() {
  const [userInfo, setUserInfo] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const tokens = await getAccessToken();
      //console.log("access token: " + tokens);
      if (tokens) {
        const token_decode = decodeToken(tokens);

        // Verifica a assinatura do token
        //const isValid = await verifyTokenSignature(tokens);
        //console.log(isValid)
        //if (!isValid) {
        //  setError("Token inválido ou assinado incorretamente.");
        //  return;
        //}

        const user = token_decode;
        if (user.role === null || user.role !== "DESENVOLVEDOR") {
          console.log(user?.role);
          setError(
            "Acesso negado: você não tem permissão para acessar esta página."
          );
          return;
        }

        setUserInfo(user);
      } else {
        console.error("Tokens não disponíveis.");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-500 h-screen flex justify-center items-center">
      {error ? (
        <h1 className="text-red-500 font-semibold text-2xl">{error}</h1>
      ) : userInfo ? (
        <div className="relative flex flex-col items-center bg-purple-200 rounded-xl w-70 h-70 shadow-lg p-3 ">
          <div className="absolute top-0 transform -translate-y-10 bg-purple-300 p-4 rounded-full shadow-md">
            <h1 className="text-white font-bold text-3xl">👋</h1>
          </div>
          <h1 className="mt-20 text-2xl font-bold text-gray-700">
            Olá, {userInfo.username}!
          </h1>
          <h2 className="mt-2 text-lg text-gray-600">
            Função:{" "}
            <span className="font-semibold text-gray-800">{userInfo.role}</span>
          </h2>
        </div>
      ) : (
        <h1 className="text-white text-lg">
          VOCÊ NÃO TEM PERMISSÃO PARA ACESSAR ESTÁ ROTA!!!!!
        </h1>
      )}
    </div>
  );
}

// Função para
