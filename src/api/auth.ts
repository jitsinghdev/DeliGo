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
        token: string;
        message: string;
    };
};

export async function login(input: LoginInput) {
    const res = await post<BackendLoginResp>('/auth/login', input);
    if (res.success) {
        const token = res.message?.token;
        if (token) {
            await setToken(token);
        }
        const status = res.success !== undefined ? 'success' : 'error';
        const resultData = {
            [status]: true,
            message: res.message?.message
        };
    
        return resultData;
    }
    
    return res;
}

/* ---------- Registro ---------- */

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

type BackendRegisterResp = {
    success: boolean;
    message: string;
};

/**
 * Registro de usuario
 * Endpoint backend: /api/user/createUser  -> aquí solo '/user/createUser'
 */
export async function register(input: RegisterInput) {
    const res = await post<BackendRegisterResp>('/user/createUser', input);

    return res;
}