import request from "../../utils/request";
export function loginByPassword(data) {
    return request({ method: "post", url: "/user/user/loginForPassword", data, headers: { "Content-Type": "application/json" } });
}
export function loginByNote(data) {
    return request({ method: "post", url: "/user/user/loginForNote", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}