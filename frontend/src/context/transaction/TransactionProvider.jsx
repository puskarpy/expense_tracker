import { createContext, useState, useEffect } from "react";
import { getDashboardData } from "../../services/transaction/dashboard";

export const TransactionContext = createContext()

export default function TransactionProvider({children}){
    const [transaction, setTransaction] = useState(null)

    useEffect(() => {
        const fetchDashboardData = async() => {
            const data = await getDashboardData()
            setTransaction(data.data)
        }
        fetchDashboardData()
    }, [])

    return (

        <TransactionContext.Provider value={{transaction, setTransaction}}>
            {children}
        </TransactionContext.Provider>

    )

}