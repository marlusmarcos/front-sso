// lib/auth.ts
import axios from "axios";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";

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
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnKx4rXjnjXyIkh8WOWDZ
zLgwqfONM2FThpsSkbV0qUOU5Y4rZRHIhCgNg5alYPrI7qNayVTkB4CWL4jpHw9y
Z9CFDRhty/eOrd4fNRnQ/lWQ9T8B6ghES9hSbWIurX5z6k+/fmQ+BaVhbu7CEbqB
eQiLuFdsWH/nAcb6M+BOt/6HGJYj9oymp0sLA9Y2KQcR3WyyCY6IQnqW2CRQpAmY
YC9WPQb+ZcKoYBygW/fja6irkmBMngVi+LBEbtPor5M9AhD5fVicAU7ZE4bKR2bp
NocshcSLy+0ISThWY3iG2nnlSwqwYDF7YPE8RBTXN+JZNg8vzJGokg8lq+nGzIKN
SQIDAQAB
-----END PUBLIC KEY-----`
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