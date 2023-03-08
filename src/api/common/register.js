import request from "../../utils/request";
export default function register(data) {
    return request({ method: "post", url: "LoginServlet", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}