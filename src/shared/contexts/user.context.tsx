import React, { useEffect } from "react";
import { createContext , useState } from "react";
import {  UserCredential } from "firebase/auth";
import { createUserDocFromAuth, onAuthStateChangedListener, } from "../../utils/firebase/firebase.utils";

type CurrentUserType = UserCredential | null;

export const UserContext = createContext<{
    currentUser: CurrentUserType;
    setCurrentUser: (user: CurrentUserType) => void;
}>({
    currentUser: null, // Initialize with null
    setCurrentUser: () => {} // Provide a default function
});


export const UserProvider = ({children}: {children: React.ReactNode})=>{
    const [currentUser, setCurrentUser] = useState<CurrentUserType>(null);
    const value = {currentUser, setCurrentUser};


    // signOutUser();
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocFromAuth(currentUser as UserCredential);
            }
            // console.log(`currentUser from provider ${JSON.stringify(user)}`)
            setCurrentUser(user as CurrentUserType);
        })

        return unsubscribe;
    } , []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

