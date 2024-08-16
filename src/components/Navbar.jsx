
const Navbar = () => {
    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="font-bold text-3xl">prodFinder</a>
                </div>
                <div className="flex-none">
                    <button className="btn btn-outline btn-success">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;