import { useContext } from "react";
import { AuthContext } from "../context/user/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicLayout(){
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <p>Loading...</p>
    }

    if(user){
        return <Navigate to={"/dashboard"} replace />
    }

    return <Outlet/>
}