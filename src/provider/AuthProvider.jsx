import { createContext, useContext, useState } from 'react';

// Create a context to manage user data
const AuthContext = createContext();

// Create a provider to wrap your app with
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const userLogin = (userData) => {
        // Assuming userData is an object containing user information
        setUser(userData);
    };

    // const logout = () => {
    //     setUser(null);
    // };

    const info = { userLogin }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};



// Create a custom hook to access the user data and login/logout functions
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
