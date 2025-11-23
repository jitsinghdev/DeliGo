// src/api/auth.ts
import { post } from '@/lib/http';
import { setToken } from '@/lib/token';

/* ---------- Login ---------- */

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

/* ---------- Registro ---------- */

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

type BackendRegisterResp = {
    success: boolean;
    message: {
        token?: string;   // por si el backend devuelve token al crear
        message: string;
    };
};

/**
 * Registro de usuario
 * Endpoint backend: /api/user/createUser  -> aquí solo '/user/createUser'
 */
export async function register(input: RegisterInput) {
    const res = await post<BackendRegisterResp>('/user/createUser', input);
    
    if (!res?.success) {
        throw new Error('Registro fallido');
    }
    
}