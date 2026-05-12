import { normalApi } from "../api/api";

export const register = async(data) => {
    const res = await normalApi.post("/user/register/", data)
    return res.data
}

export const login = async(data) => {
    const res = await normalApi.post("/user/register", data)
    return res.data
}