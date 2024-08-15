import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)
    const auth = getAuth(app)
useEffect(()=>{
    onAuthStateChanged(auth,currentUser=>{
        if(currentUser){
            setUser(currentUser)
            setLoading(false)
        }
    })
    },[])

    const signIn = (email,pass)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,pass)
    }
    const signUp = (email,pass)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,pass)
    }

    const userAuth = {signIn,signUp,loading,setLoading,user}
    return <AuthContext.Provider value={userAuth}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;