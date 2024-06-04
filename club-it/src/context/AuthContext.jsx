import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user') || null,
        isAdmin: localStorage.getItem('isAdmin') === 'true',
    });

    useEffect(() => {
        if (auth.token) {
            const decodedToken = JSON.parse(atob(auth.token.split('.')[1]));
            setAuth((prev) => ({
                ...prev,
                user: decodedToken.userId,
                isAdmin: decodedToken.isAdmin,
            }));
            localStorage.setItem('user', decodedToken.userId);
            localStorage.setItem('isAdmin', decodedToken.isAdmin);
        }
    }, [auth.token]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
