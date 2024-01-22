import { Outlet } from "react-router-dom";
import Navbar from "../share/Navbar";


const Main = () => {
    return (
        <div>
            <Navbar />
            <div className="">
                <Outlet />
            </div>

        </div>
    );
};

export default Main;