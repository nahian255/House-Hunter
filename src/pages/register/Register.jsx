import { Input, Select } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState('')
    const [roleError, setRoleError] = useState('')
    const [phoneNumError, setPhoneNumError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const validateName = (newName) => {
        if (newName.trim() === '') {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    };


    const validatePhoneNum = (newPhoneNum) => {
        if (newPhoneNum.trim() === '') {
            setPhoneNumError('PhoneNum is required');
        } else {
            setPhoneNumError('');
        }
    };


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
        // For example, you can check for minimum length or any other criteria
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, role, phoneNum, email, password);
    }

    return (
        <div className="max-h-screen bg-white p-6 lg:p-16 flex justify-center items-center">
            <div className="min-h-3.5 md:w-[400px] lg:h-[550px] p-4 lg:px-6 rounded-3xl shadow-2xl bg-gray-200 mt-10 pt-8">
                <h1 className="text-4xl text-[#433939] text-center font-sans font-bold">Register </h1>

                <form onSubmit={handleSubmit} className='w-full py-6'>
                    <div>
                        <label className='text-start text-xl text-[#1f3e72] font-sans'>name</label>
                        <Input
                            size="md"
                            radius="md"
                            label="Name"
                            placeholder="Enter your name"
                            value={name}
                            className='w-full'
                            onChange={(e) => {
                                setName(e.target.value);
                                validateName(e.target.value);
                            }}
                        />
                        <div className='h-1'>
                            {nameError && <div className='text-red-500 text-sm'>{nameError}</div>}
                        </div>
                    </div>

                    <div className='py-2'>
                        <label className='text-start text-xl text-[#1f3e72] font-sans'>Role</label>
                        <Select
                            placeholder="Pick value"
                            data={['House Owner', 'House Renter',]}
                            value={role} onChange={setRole}
                            required
                        />
                    </div>


                    <div className='py-2'>
                        <label className='text-start text-xl text-[#1f3e72] font-sans'>phone number</label>
                        <Input
                            size="md"
                            radius="md"
                            label="phone number"
                            placeholder="Enter your phone number"
                            value={phoneNum}
                            className='w-full'
                            onChange={(e) => {
                                setPhoneNum(e.target.value);
                                validatePhoneNum(e.target.value);
                            }}
                        />
                        <div className='h-1'>
                            {phoneNumError && <div className='text-red-500 text-sm'>{phoneNumError}</div>}
                        </div>
                    </div>
                    <div className='py-2'>
                        <label className='text-start text-xl text-[#1f3e72] font-sans'>Email</label>
                        <Input
                            size="md"
                            radius="md"
                            label="Name"
                            placeholder="Enter your email"
                            value={email}
                            className='w-full'
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                        />
                        <div className='h-1 '>
                            {emailError && <div className='text-red-500 text-sm'>{emailError}</div>}
                        </div>
                    </div>
                    <div>
                        <label className='text-start text-xl text-[#1f3e72] font-sans'>Password</label>
                        <Input
                            size="md"
                            radius="md"
                            label="Name"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            className='w-full'
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                        />
                        <div className='h-1'>
                            {passwordError && <div className='text-red-500 text-sm'>{passwordError}</div>}
                        </div>
                    </div>
                    <div className="pt-3 pb-1">
                        <p className='text-[#8c8b8b]'> Already have an acount.<Link to={'/login'} className="text-blue-500 "> Login Here</Link></p>
                    </div>
                    <div className=' py-2'>
                        <button type="submit" className="bg-[#433939] w-full  text-white p-2 rounded-md hover:bg-blue-700">Register</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Register;