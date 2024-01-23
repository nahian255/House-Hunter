import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@mantine/core";
import Swal from "sweetalert2";

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('');

    console.log(email, emailError);

    const validateEmail = (newEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newEmail.trim()) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(newEmail)) {
            setEmailError('Invalid email format');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };
    const validatePassword = (newPassword) => {
        // Add your custom password validation logic here
        if (!newPassword.trim()) {
            setPasswordError('Password is required');
            return false;
        } else if (newPassword.length < 5) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        validateEmail(email), validatePassword(password)
        if (email && password) {
            try {
                const response = await fetch('http://localhost:3000/user-login', {
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
                    navigate('/');
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

        } else {
            // At least one field is not valid, display an error message or handle it accordingly
            console.log('Login failed. Please check the form for errors.');
        }
    };


    return (
        <div className="max-h-screen bg-white p-6 lg:p-16 flex justify-center items-center">
            <div className="min-h-3.5 md:w-[400px] lg:h-[500px] p-4 lg:px-6 rounded-3xl shadow-2xl bg-[#c2b4b4] ">
                <h1 className="text-4xl text-[#433939] text-center font-sans font-bold">LOGIN</h1>

                <form onSubmit={handleSubmit} className='w-full py-10'>
                    <div className="">
                        <label className='text-start text-xl text-[#1f3e72] font-sans py-'>Email</label>
                        <Input
                            size="md"
                            radius="md"
                            label="Name"
                            placeholder="Enter your email"
                            value={email}
                            className='w-full py-1'
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                        />
                        <div className="h-1">
                            {emailError && <div className='text-red-500 text-sm'>{emailError}</div>}
                        </div>
                    </div>
                    <div className="py-2">
                        <label className='text-start text-xl text-[#1f3e72] font-sans'>Password</label>
                        <Input
                            size="md"
                            radius="md"
                            label="Name"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            className='w-full py-1'
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                        />
                        <div className="h-1">
                            {passwordError && <div className='text-red-500 text-sm'>{passwordError}</div>}
                        </div>
                    </div>
                    <div className="pt-3 pb-1">
                        <p className="text-[#8c8b8b]">Don&apos;t have a Account yet?<Link to={'/register'} className="text-blue-500 "> Create an Account</Link></p>
                    </div>
                    <div className=' py-2'>
                        <button type="submit" className="bg-[#1f3e72] w-full  text-white p-2 rounded-md hover:bg-blue-700"> Login</button>
                    </div>
                </form>

            </div>
        </div>

    );
};

export default Login;