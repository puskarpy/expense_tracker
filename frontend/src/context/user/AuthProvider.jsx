import { createContext, useState, useEffect } from "react";
import { getUser, logout } from "../../services/user/user";
import { login } from "../../services/auth/auth";

export const AuthContext = createContext()


export default function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async() => {
            const token = localStorage.getItem("access")
            if(!token) {
                setLoading(false)
                return
            }

            try {
                const data = await getUser()
                setUser(data.data)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const loginUser = async (formData) => {
        try {
            const res = await login(formData);

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            const userRes = await getUser();
            setUser(userRes.data);

            return res;

        } catch (err) {
            console.log(err);
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            setUser(null);
        }
    };

    const logoutUser = async(data) => {
        await logout(data)
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setUser(null)
    }


    return (
    <AuthContext.Provider value={{user, setUser, loading, loginUser, logoutUser}}> 
        {children}
    </AuthContext.Provider>
)
 
}