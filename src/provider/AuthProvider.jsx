import { createContext, useContext, useEffect, useState } from 'react';
import Swal from "sweetalert2";


// Create a context to manage user data
const AuthContext = createContext();

// Create a provider to wrap your app with
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user);

    const userLogin = async (email, password) => {
        console.log(email, password);
        try {
            const response = await fetch('https://househunter-wj8g.onrender.com/user-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (response.ok) {
                // Handle successful login, e.g., show success message and redirect
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });

                if (email) {
                    fetch(`https://househunter-wj8g.onrender.com/current-userinfo?email=${email}`)
                        .then(response => response.json())
                        .then(data => {
                            // Update state with the received booking data
                            setUser(data);
                            // Store user data in localStorage
                            localStorage.setItem('user', JSON.stringify(data));

                        })
                        .catch(error => {
                            console.error('Error retrieving booking data:', error);
                        });
                } else {
                    alert('curent user not found')
                }
            } else {
                // Handle login error
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: errorData.error || "email and password not match",
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {
        // On component mount, check if user data exists in localStorage and set the state
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const logout = () => {
        setUser(null);
        // Clear user data from localStorage
        localStorage.removeItem('user');
    };

    const info = { userLogin, user, logout }
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
