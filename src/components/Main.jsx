import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";

const Main = () => {
    return (
        <div className="container mx-auto">
            <Navbar></Navbar>
            <div>
                <Outlet />
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Main;