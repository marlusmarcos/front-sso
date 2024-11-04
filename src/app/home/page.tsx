"use client"
import { useEffect, useState } from "react";
import {  getAccessToken, decodeToken } from "../../lib/auth";

interface JwtPayload {
  role: string;
  username: string;
}

export default function Home() {
  
  const [userInfo, setUserInfo] = useState<JwtPayload | null>(null);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {

      const fetchUserInfo = async () => {
        const tokens = await getAccessToken(); 
        const token_decode = await decodeToken(tokens);
        console.log(token_decode)
        await sleep (2000)
        if (tokens) {
          const user = token_decode; 
          setUserInfo(user);
        }
      };
      fetchUserInfo();
    
  }, [] );

  return (
    <div>
      {userInfo ? (
        <h1>
          Olá {userInfo.username}, sua role é: {userInfo.role}
        </h1>
      ) : (
        <h1>Aguardando informações do usuário...</h1>
      )}
    </div>
  );
}


