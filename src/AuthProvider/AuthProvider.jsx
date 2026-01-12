
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/Firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user,setUser] = useState(null);

    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const loginUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth,provider)
    }
    const logout = () => {

      return signOut(auth)
    }

    const updateUserProfile = (profile) => {

        return updateProfile(auth.currentUser,profile)
    }

    const forgotPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth,email);
    }

    // observe user State
    useEffect(() => {
        const startTime = Date.now();
        const minLoadingTime = 2000; // 2 seconds minimum

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
            // Calculate remaining time to show loading
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

            // Ensure loading shows for at least minLoadingTime
            setTimeout(() => {
                setLoading(false);
            }, remainingTime);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
     createUser,loading,loginUser,
     user,logout,logInWithGoogle,forgotPassword,
     updateUserProfile,setLoading

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;