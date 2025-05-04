import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { User } from "firebase/auth";
import { 
  createUserDocFromAuth, 
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";

type CurrentUserType = User | null;

export const UserContext = createContext<{
    currentUser: CurrentUserType;
    setCurrentUser: (user: CurrentUserType) => void;
}>({
    currentUser: null,
    setCurrentUser: () => {}
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state: UserState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user: User | null) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}

type UserAction = {
    type: string;
    payload: CurrentUserType;
};

type UserState = {
    currentUser: CurrentUserType | null;
};