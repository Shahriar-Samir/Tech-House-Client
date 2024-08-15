import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import useAxiosSecure from "../Hooks/useAxiosSecure";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const auth = getAuth(app)
    const googleAuthProvider = new GoogleAuthProvider()
    const axiosSecure = useAxiosSecure()

useEffect(()=>{
    onAuthStateChanged(auth,currentUser=>{
        if(currentUser){
            const {email,uid} = currentUser
            axiosSecure.post('/token', {uid,email})
            .then(()=>{
                setUser(currentUser)
                setLoading(false)
            })
        }
        else{
            axiosSecure.post('/removeToken')
            .then(()=>{
                setUser(null)
                setLoading(false)
            })
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
    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleAuthProvider)
    }
    const logOut = ()=>{
        return signOut(auth)
    }

    const userAuth = {signIn,signUp,loading,setLoading,user,googleSignIn,logOut}
    return <AuthContext.Provider value={userAuth}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;