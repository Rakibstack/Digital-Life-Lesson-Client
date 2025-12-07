
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/Firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

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

        return signInWithPopup(auth,provider)
    }
    const logout = () => {

      return signOut(auth)
    }

    const forgotPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth,email);
    }

    useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {  

         setUser(currentUser)
         setLoading(false)       
    })
    return () => {
        unsubscribe();
    }
    },[])

    const authInfo = {
     createUser,loading,loginUser,
     user,logout,logInWithGoogle,forgotPassword

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;