import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddHouse from "../pages/houseOwner/addHouse/AddHouse";
import MyHouse from "../pages/houseOwner/myHouse/MyHouse";
import BookingHouse from "../pages/houseRenter/bookingHouse/BookingHouse";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: async () => {
                    return fetch(`https://househunter-wj8g.onrender.com/all-house`);
                },
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: '/owner/add-house',
                element: <AddHouse />
            },
            {
                path: '/owner/my-house',
                element: <MyHouse />
            },
            {
                path: '/renter/booking-house',
                element: <BookingHouse />
            },
        ]
    },
]);


export default router;