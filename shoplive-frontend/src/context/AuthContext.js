"use client";

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // This state holds the token, role, and user_id in memory
    const [authState, setAuthState] = useState(null);

    const login = (data) => {
        setAuthState({
            token: data.access_token,
            role: data.role,
            userId: data.user_id
        });
    };

    const logout = () => {
        setAuthState(null);
    };

    return (
        <AuthContext.Provider value={{
            user: authState,
            login,
            logout,
            isAuthenticated: !!authState
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to use the context in any component
export const useAuth = () => useContext(AuthContext);