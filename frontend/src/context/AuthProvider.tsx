import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useModal } from './PopupModal';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: (type: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('authToken');
    });
    const { showModal } = useModal();


    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [token]);

    const login = (token: string) => {
        const formattedToken = token;
        setToken(formattedToken);
        window.location.href = '/orders';
    };

    const logout = (type: string) => {
        setToken(null);
        if (type === "error") {
            showModal("Authentication has expired/invalid", "error");
        }
        else {
            showModal("Logged out successfully", "success");
        }
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
