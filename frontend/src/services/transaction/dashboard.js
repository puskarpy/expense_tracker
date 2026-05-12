import { authApi } from "../api/api";

export const getDashboardData = async() => {
    const res = await authApi.get("/transactions/dashboard/")
    return res.data
}

export const getTransactions = async() => {
    const res = await authApi.get("/transactions/")
    return res.data
}