"use client";
import { useEffect, useState } from "react";
import { getAccessToken, decodeToken } from "../../lib/auth";

interface JwtPayload {
  role: string;
  username: string;
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const client_id = "CLIENT_ID";
    const redirect_uri = "http://localhost:3000/callback";
    const authUrl = `http://localhost:8080/login?client_id=${client_id}&redirect_uri=${redirect_uri}&state=Ez4tJ02&response_type=code`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const tokens = await getAccessToken();
        if (tokens) {
          const token_decode = await decodeToken(tokens);
          setUserInfo(token_decode);
        }
      } catch (err) {
        setError("Erro ao carregar informações do usuário.");
      }
    };
    fetchUserInfo();
  }, []);
  const handleDesenvolvedor = () => {
    const authUrl = `http://localhost:3000/desenvolvedor`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-sky-500 gap-10" style={{ flexDirection: 'column' }}>
      {error ? (
        <h1 className="text-red-500 font-semibold text-xl">{error}</h1>
      ) : userInfo ? (
        <div className="relative flex flex-col items-center bg-white rounded-xl w-70 h-70 shadow-lg p-3">
          <div className="absolute top-0 transform -translate-y-10 bg-green-400 p-4 rounded-full shadow-md">
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
        <div className="flex flex-col items-center">
          <h1 className="text-gray-700 text-xl mb-4">Bem-vindo ao sistema</h1>
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
          >
            Fazer Login via CAv4
          </button>
          <h1 className="mt-4 text-gray-500 text-lg">
            Aguardando informações do usuário...
          </h1>
        </div>
      )}
      <div style={{ display: 'block' }}>
        <button
          onClick={handleDesenvolvedor}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Ir para página protegida
        </button>
      </div>
    </div>
  );
}
