// lib/auth.ts
import axios from "axios";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";
import {pk} from "./publickey"

export async function getTokenFromCode(code: string): Promise<{ access_token: string; refresh_token: string } | null> {
  try {
    const response = await axios.post(
      "http://localhost:8080/oauth/token",
      {
        code: code 
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
    return response.data; 
  } catch (error) {
    console.error("Erro ao obter token:", error); 
    return null; 
  }
}

export function saveTokens(accessToken: string, refreshToken: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  }
}

export function getAccessToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
}


export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function decodeToken(token: string | null): JwtPayload | null {
  try {
    if (token === null) return null;
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

export async function verifyTokenSignature(token: string): Promise<boolean> {
  const publicKey = pk
  return new Promise((resolve) => {
    jwt.verify(token, publicKey, (err) => {
      if (err) {
        console.error("Erro na verificação do token:", err);
        return resolve(false); // Retorna falso em caso de erro
      }
      resolve(true); // Retorna verdadeiro se a verificação for bem-sucedida
    });
  });
}