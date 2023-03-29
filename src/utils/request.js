import axios from "axios";
const request = axios.create({
    baseURL: "http://192.168.43.114:10010",
    // baseURL:"https://www.fastmock.site/mock/9c46fd8e0fac8a67df061f3c386124a8/api",
    timeout: 3000,
    // withCredentials:true,
    // changeOrigin: true
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