import { authApi } from "../api/api";

export const update = async(data) => {
    const res = await authApi.patch("/user/update/", data)
    return res.data
}

export const deleteUser = async() => {
    const res = await authApi.delete("/user/delete/")
    return res.data
}

export const getUser = async() => {
    const res = await authApi.get("/user/me/")
    return res.data
}

export const logout = async(data) => {
    const res = await authApi.post("/user/logout/", data)
    return res.data
}