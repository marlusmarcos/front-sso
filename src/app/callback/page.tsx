// src/app/callback/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getTokenFromCode, saveTokens } from "../../lib/auth";


export default function Callback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const handleAuth = async () => {
      if (code) {
        const tokens = await getTokenFromCode(code);

        if (tokens) {

          console.log("ENTROU NO IF")
          saveTokens(tokens.access_token, tokens.refresh_token);
          window.location.href = "/home";
        } else {
          window.location.href = "/";
        }
      }
    };
    handleAuth();
  }, [code]);

  return <div>Autenticando...</div>;
}
