import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(result => {
                toast("log out successful")
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="w-full shadow-md px-2">
            <div className="flex my-4 py-6 items-center bg-base-100">
                <div className="flex-1">
                    <Link to={"/"} className="font-bold text-3xl md:text-5xl mt-10">prod<span className="text-green-600">Finder</span></Link>
                </div>
                <div className="flex-none">
                    {
                        user ? <button onClick={handleLogOut} className="btn btn-outline btn-success">Logout</button> :
                            <Link to="/login"><button className="btn btn-outline btn-success">Login</button></Link>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;