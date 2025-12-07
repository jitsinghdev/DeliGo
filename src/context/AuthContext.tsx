import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, clearToken } from '@/lib/token';


// Creamos el contexto con valor por defecto
const AuthContext = createContext({
    loggedIn: false,
    setLoggedIn: (value: boolean) => { }
});

// Provider que envuelve la app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkToken() {
            const token = await getToken();
            if (token) {
                setLoggedIn(true);
            } 
        }
        checkToken();
    }, []);


    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar desde cualquier componente
export const useAuth = () => useContext(AuthContext);
