import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = useCallback((email, password) => {
        // Mock login logic - in real app, this would be an API call
        if (email && password) {
            const userData = {
                id: '1',
                email,
                name: email.split('@')[0],
                photo: null,
                role: 'member',
                joinedAt: new Date().toISOString()
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    }, []);

    const signup = useCallback((name, email, password) => {
        // Mock signup logic
        if (name && email && password) {
            const newUser = {
                id: Date.now().toString(),
                email,
                name,
                photo: null,
                role: 'member',
                joinedAt: new Date().toISOString()
            };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
