import { Children, useContext } from "react";
import Loading from "../Components/Loading";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const AuthRoute = (children) => {
    const {loading,user} = useContext(AuthContext)
    const link = useLocation()
    const navigate = useNavigate()

    if(loading){
        return <Loading/>
    }
    if(user){
    if(link.pathname === '/login' || link.pathname === 'signup'){
             return navigate(-1)
    }
}
    return children
};

export default AuthRoute;