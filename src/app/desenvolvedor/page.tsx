// src/app/developer/page.tsx

"use client";
import { useEffect, useState } from "react";
import {getAccessToken , decodeToken, verifyTokenSignature } from "../../lib/auth";

interface JwtPayload {
  role: string;
  username: string;
}

export default function DeveloperPage() {
  const [userInfo, setUserInfo] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const tokens =  await getAccessToken();
      console.log ("access token: " + tokens)
      if (tokens) {
        const token_decode =  decodeToken(tokens);

        // Verifica a assinatura do token
        //const isValid = await verifyTokenSignature(tokens);
        //console.log(isValid)
        //if (!isValid) {
        //  setError("Token inválido ou assinado incorretamente.");
        //  return;
        //}

        const user = token_decode;
        if (user.role === null || user.role !== "DESENVOLVEDOR") {
            console.log (user?.role)
          setError("Acesso negado: você não tem permissão para acessar esta página.");
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
    <div>
      {error ? (
        <h1>{error}</h1>
      ) : userInfo ? (
        <h1>
          Olá {userInfo.username}, você tem acesso à página de desenvolvedor!
        </h1>
      ) : (
        <h1>Aguardando informações do usuário...</h1>
      )}
    </div>
  );
}

// Função para 
