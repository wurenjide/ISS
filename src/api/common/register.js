import request from "../../utils/request";
export default function register(data) {
    return request({ method: "post", url: "/user/user/userRegister", data, headers: { "Content-Type": "application/json","Access-Control-Allow-Origin":"*"} });
}