import { authApi } from "../api/api";

export const getDashboardData = async() => {
    const res = await authApi.get("/transactions/dashboard/")
    return res.data
}

export const getTransactions = async() => {
    const res = await authApi.get("/transactions/")
    return res.data
}

export const addTransaction = async(data) => {
    const res = await authApi.post("/transactions/", data)
    return res.data
}

export const fetchCategories =  async() => {
    const res = await authApi.get("/transactions/categories/")
    return res.data
}