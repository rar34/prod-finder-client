import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if(loading){
        return <div className="text-center my-10"><span className="loading loading-spinner loading-lg"></span></div>
    }

    if(!user){
        return <Navigate to="/login" state={location.pathname}/>
    }
    return (
            <div>
                {children}
            </div>
        );
};

export default PrivateRoutes;

PrivateRoutes.propTypes ={
    children: PropTypes.node
}