import React from "react";
import { createContext , useState } from "react";
import { UserCredential } from "firebase/auth";

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
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}