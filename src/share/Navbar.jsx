import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import './css/style.css'

const Navbar = () => {

    const { user, logout } = useAuth()
    const role = user && user.length > 0 ? user[0].role : null;
    console.log(user, role);

    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const toggleMobileNav = () => {
        setMobileNavOpen(!isMobileNavOpen);
    };

    return (
        <div className=''>
            <div className="bg-[#433939] text-white p-3 flex justify-between items-center px-4 md:px-16">
                <div className="flex">
                    <Link to='/'><h1>House Finder</h1>
                    </Link>
                    {/* <h1 className="text-xl md:text-2xl">DreamDwell</h1> */}
                </div>
                <div className="flex gap-4 text-lg lg:hidden">
                    <button onClick={toggleMobileNav} className="text-white"> <p> Switch</p>
                    </button>
                </div>
                <div className="hidden lg:flex gap-4 text-lg">
                    <NavLink to={'/'} activeClassName="active">Home</NavLink>
                    {user ? <>
                        {role === 'House Owner' && (<>
                            <NavLink to={'/owner/my-house'} activeClassName="active">
                                My House
                            </NavLink>
                            <NavLink to={'/owner/add-house'} activeClassName="active">
                                Add House
                            </NavLink>
                            <p className="bg-gray-400 p-1 rounded-lg"> Role- House Owner</p>

                        </>

                        )}
                        {role === 'House Renter' && (
                            <>

                                <NavLink to={'/renter/booking-house'} activeClassName="active">
                                    Booking House
                                </NavLink>
                                <p className="bg-gray-400 p-1 rounded-lg"> Role- House Render</p>

                            </>

                        )}
                        <button onClick={logout} className="hover:bg-[#3064bc] text-white px-2 py-1 text-md rounded-md bg-blue-700">
                            Logout
                        </button>
                    </> : <>
                        <NavLink to={'/login'} activeClassName="active" onClick={toggleMobileNav}>
                            <button className="hover:bg-[#3064bc] text-white px-2 py-1 text-md rounded-md bg-blue-700">
                                Login
                            </button>
                        </NavLink>
                        <NavLink to={'/register'} activeClassName="active" onClick={toggleMobileNav}>
                            <button className="hover:bg-[#3064bc] text-white px-2 py-1 text-md rounded-md bg-blue-700">
                                register
                            </button>

                        </NavLink>
                    </>}

                </div>
            </div>

            {/* responsive  Nav */}
            {isMobileNavOpen && (
                <div className="lg:hidden bg-[#ef5446] text-white px-8 md:px-16 flex flex-col gap-4">
                    <NavLink to={'/'} activeClassName="active" onClick={toggleMobileNav}>Home</NavLink>
                    <NavLink to={'/login'} activeClassName="active" onClick={toggleMobileNav}>
                        <button className="hover:bg-[#3064bc] text-white px-2 py-1 text-md rounded-md bg-blue-700">
                            Login
                        </button>
                    </NavLink>
                    <NavLink to={'/register'} activeClassName="active" onClick={toggleMobileNav}>
                        <button className="hover:bg-[#3064bc] text-white px-2 py-1 text-md rounded-md bg-blue-700">
                            Register
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Navbar;
