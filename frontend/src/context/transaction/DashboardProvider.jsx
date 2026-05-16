import { createContext, useState, useEffect, useContext } from "react";
import { getDashboardData } from "../../services/transaction/dashboard";
import { AuthContext } from "../user/AuthProvider";

export const DashboardContext = createContext()

export default function DashboardProvider({children}){
    const {user} = useContext(AuthContext)
    const [dashboard, setDashboard] = useState(null)

    
    useEffect(() => {
        if(!user) return
        const fetchDashboardData = async() => {
            const data = await getDashboardData()
            setDashboard(data.data)
        }
        fetchDashboardData()
    }, [user])

    return (

        <DashboardContext.Provider value={{dashboard, setDashboard}}>
            {children}
        </DashboardContext.Provider>

    )

}