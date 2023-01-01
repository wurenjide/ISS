import axios from "axios";
const request = axios.create({
    baseURL: "http://localhost",
    timeout: 3000,
    withCredentials:true
});
request.interceptors.request.use(config => {
    
    return config;
}, err => {
    return Promise.reject(err);
});
request.interceptors.response.use(res => {
    return res.data;
}, err => {
    return Promise.reject(err);
})
export default request;