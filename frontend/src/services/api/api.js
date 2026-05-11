import axios from "axios"

const normalApi = axios.create({
    baseURL:"http://localhost:8000/api/v1"
})

const authApi = axios.create({
    baseURL: "http://localhost:8000/api/v1"
})

authApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("access")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export {authApi, normalApi}