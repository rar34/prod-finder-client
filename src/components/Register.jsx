import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

const Register = () => {

    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(() => {
                toast("User created successfully")
                navigate("/")
            })
            .catch(error => {
                console.log(error)
                toast(error.message)
            })
    }



return (
    <div className="w-full md:w-1/2 mx-auto bg-base-200 md:p-6 rounded-lg my-14">
        <div className="hero-content">

            <div className="card shrink-0 w-full p-2 md:p-6 bg-base-100">
                <h2 className="text-3xl font-bold text-center">Register Now!!!</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" />

                    </div>
                    {/* password field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <div className="relative">
                            <input name="password" type="password" placeholder="password" className="input w-full input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-success text-white font-medium">Register</button>
                    </div>
                </form>
                <p>Already have an account ? <Link className="text-[#1DD100] font-bold" to="/login">Login</Link></p>
            </div>

        </div>
    </div>
);
};

export default Register;