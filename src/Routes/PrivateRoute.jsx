import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Components/Loading";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
        const {loading,user} = useContext(AuthContext)
        if(loading){
            return <Loading/>
        }
        if(user){
            return children
        }
        return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;