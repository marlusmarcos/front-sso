// pages/index.tsx
//import { useRouter } from "next/router";
'use client'
export default function Home() {
  //const router = useRouter();

  const handleLogin = () => {
    const client_id = "CLIENT_ID";
    const redirect_uri = "http://localhost:3000/callback";
    const authUrl = `http://localhost:8080/login?client_id=${client_id}&redirect_uri=${redirect_uri}&state=Ez4tJ02&response_type=code`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Bem-vindo ao sistema</h1>
      <button onClick={handleLogin}>Fazer Login via CAv4</button>
    </div>
  );
}

//http://localhost:8080/login?client_id=123&redirect_uri=https://tntsports.com.br&state=marlus&response_type=code