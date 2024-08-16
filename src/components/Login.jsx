import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";



const Login = () => {

    const { signInUser, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
        .then(()=>{
            toast("Login Successfully")
            navigate("/")
        })
        .catch(error =>{
            toast("invalid-credential")
        })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                if (result.user) {
                    toast("login successful")
                    navigate( "/")
                }
            })
            .catch(() => {
                toast("invalid-credential")
            })
    }



    return (
        <div className="w-full md:w-1/2 mx-auto bg-base-200 md:p-6 rounded-lg my-14">
            <div className="hero-content">
                <div className="card shrink-0 w-full p-2 md:p-6 bg-base-100">
                    <h2 className="text-3xl font-bold text-center">Please Login</h2>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" />

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-success text-white font-medium">Login</button>
                        </div>
                    </form>
                    <div data-aos="fade-down" data-aos-delay="400" className="px-6 py-2">
                        <p className="my-3 text-center font-bold">OR</p>

                        <button onClick={handleGoogleLogin} className="rounded-lg flex items-center btn btn-success w-full md:w-full p-2 mx-auto text-center text-white mb-4"><FaGoogle className="text-xl" /> Continue with google</button>
                        <p>Do not have an account ? <Link className="text-[#1DD100] font-bold" to="/register">Sign Up</Link> for free</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;