
"use client";
export default function Home() {

  const handleLogin = () => {
    const client_id = "CLIENT_ID";
    const redirect_uri = "http://localhost:3000/callback";
    const authUrl = `http://localhost:8080/login?client_id=${client_id}&redirect_uri=${redirect_uri}&state=Ez4tJ02&response_type=code`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-200">
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    <h1 className="text-2xl font-bold mb-4">Bem-vindo ao sistema</h1>
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
    >
      Fazer Login via CAv4
    </button>
  </div>
</div>
  );
}

//http://localhost:8080/login?client_id=123&redirect_uri=https://tntsports.com.br&state=marlus&response_type=code
