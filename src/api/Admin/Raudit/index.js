import request from "../../../utils/request";
export function getRauditInfo(data) {
    return request({ method: "get", url: "/manage/user/search", params:data, });
}
export function searchRaudit(data) {
    return request({ method: "get", url: "searchRaudit", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function updateRaudit(data) {
    return request({ method: "post", url: "/manage/user/examine", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function deleteRaudit(data) {
    return request({ method: "post", url: "deleteRaudit", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}