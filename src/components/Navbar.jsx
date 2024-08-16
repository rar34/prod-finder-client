import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to={"/"} className="font-bold text-3xl md:text-5xl mt-10">prod<span className="text-green-600">Finder</span></Link>
                </div>
                <div className="flex-none">
                    <button className="btn btn-outline btn-success">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;