// src/api/auth.ts
import { post } from '@/lib/http'; // Assuming '../lib/http' exists and exports 'post';
import { getToken, setToken } from '@/lib/token';

export interface LoginInput {
    email: string;
    password: string;
}

type BackendLoginResp = {
    success: boolean;
    message: {
        token: string;         // viene dentro de "message.token" según tu API
        message: string;
    };
};

export async function login(input: LoginInput) {
    const res = await post<BackendLoginResp>('/auth/login', input);
    
    if (!res?.success) {
        throw new Error('Inicio de sesión fallido');
    }
    
    const token = res.message?.token;
    if (!token) {
        throw new Error('Token no recibido del servidor');
    }
    
    await setToken(token);
    return token;
}