import axios from "axios";
import { publicIp } from "../config/apiUrl";
const request = axios.create({
    baseURL:  publicIp,
    // baseURL:"https://www.fastmock.site/mock/9c46fd8e0fac8a67df061f3c386124a8/api",
    // baseURL:"http://localhost:8088/",
    // baseURL: "http://192.168.2.122:8001",
    timeout: 3000,
});
request.interceptors.request.use(config => {
    config.headers["Authorization"]=localStorage.getItem("token")
    return config;
}, err => {
    return Promise.reject(err);
});
request.interceptors.response.use(res => {
    return res.data;
}, err => {
    if(err.response?.status==401){
        localStorage.removeItem("user")
        navigator("/login")
    }
    
    return Promise.reject(err);
})
export default request;