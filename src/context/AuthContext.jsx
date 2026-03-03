import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authView, setAuthView] = useState('login');

    const openAuthModal = (view = 'login') => {
        setAuthView(view);
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => setIsAuthModalOpen(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    id: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                    photo: currentUser.photoURL,
                    role: 'member', // Default role
                    joinedAt: currentUser.metadata.creationTime
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            console.error("Login Error:", error.message);
            return false;
        }
    }, []);

    const signup = useCallback(async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            return true;
        } catch (error) {
            console.error("Signup Error:", error.message);
            return false;
        }
    }, []);

    const loginWithGoogle = useCallback(async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            return true;
        } catch (error) {
            console.error("Google Login Error:", error.message);
            return false;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            return true;
        } catch (error) {
            console.error("Logout Error:", error.message);
            return false;
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            loginWithGoogle,
            logout,
            loading,
            isAuthModalOpen,
            authView,
            openAuthModal,
            closeAuthModal
        }}>
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
