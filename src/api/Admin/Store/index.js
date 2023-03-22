import request from "../../../utils/request";
export function getStore(data) {
    return request({ method: "get", url: "getAttInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function searchAttInfo(data){
    return request({ method: "get", url: "searchAttInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function updateStore(data){
    return request({ method: "post", url: "updateAttInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function deleteS(data){
    return request({ method: "post", url: "deleteS", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}