import { createContext, useEffect, useState, useContext } from "react";
import { getTransactions } from "../../services/transaction/dashboard";
import { AuthContext } from "../user/AuthProvider";

export const TransactionContext = createContext()


export default function TransactionProvider({children}){

    const {user}= useContext(AuthContext)

    const [transaction, setTransaction] = useState([])

    const fetchTransactions = async() => {
            if(!user) return
            try {
                const data = await getTransactions()
                setTransaction(data)
            }   catch (error) {
            console.log(error.response?.message || error.message)
        }
    } 

    useEffect(() => {
        fetchTransactions()
    }, [user])

    return (
        <TransactionContext.Provider value={{transaction, setTransaction, fetchTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}