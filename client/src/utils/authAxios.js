import axios from "axios";

const authAxios = axios.create({
    baseURL : "http://localhost:4500/api",
    withCredentials : false
});


authAxios.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        console.log(token);
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
);


authAxios.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response?.status === 401){
            localStorage.removeItem("token");
            window.location.href = "/login";
        }      
        return Promise.reject(error);                     
    }
);


export default authAxios;