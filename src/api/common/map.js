import axios from "axios";
const map = axios.create({
    // baseURL: "http://192.168.43.114:10010",
    baseURL:"https://api.map.baidu.com/location/ip",
    // baseURL:"http://localhost:8088/",
    timeout: 3000,
    // withCredentials:true,
    // changeOrigin: true
});
map.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});
map.interceptors.response.use(res => {
    return res.data;
}, err => {
    return Promise.reject(err);
})
export default map;