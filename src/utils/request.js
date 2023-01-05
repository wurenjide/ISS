import axios from "axios";
const request = axios.create({
    baseURL: "https://www.fastmock.site/mock/f9b1992816ee82b2a31e36c42b8343b3/api/api/",
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