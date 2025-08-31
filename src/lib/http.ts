import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '@/lib/config';
import { getToken } from '@/lib/token';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Pequeño helper para abortar si la request tarda demasiado
async function withTimeout(exec: (signal: AbortSignal) => Promise<Response>, ms = REQUEST_TIMEOUT_MS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
        return await exec(controller.signal);
    } finally {
        clearTimeout(timer);
    }
}

// Cliente HTTP genérico
export async function http<T = any>(
    path: string,
    opts: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}
): Promise<T> {
    const token = await getToken(); // leemos JWT de SecureStore

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(opts.headers || {}),
    };

    const url = `${API_BASE_URL}${path}`;

    const res = await withTimeout(
        (signal) =>
            fetch(url, {
                method: opts.method ?? 'GET',
                headers,
                body: opts.body ? JSON.stringify(opts.body) : undefined,
                signal,
            }),
        REQUEST_TIMEOUT_MS
    );

    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const data = await res.json();
            if (data?.message) message = typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
        } catch {
            try {
                const text = await res.text();
                if (text) message = text;
            } catch { }
        }
        throw new Error(message);
    }

    if (res.status === 204) return undefined as T; // No Content
    return (await res.json()) as T;
}

// Atajos para no repetir tanto
export const get = <T = any>(path: string) => http<T>(path, { method: 'GET' });
export const post = <T = any>(path: string, body?: any) => http<T>(path, { method: 'POST', body });
export const put = <T = any>(path: string, body?: any) => http<T>(path, { method: 'PUT', body });
export const patch = <T = any>(path: string, body?: any) => http<T>(path, { method: 'PATCH', body });
export const del = <T = any>(path: string) => http<T>(path, { method: 'DELETE' });