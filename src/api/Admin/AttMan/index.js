import request from "../../../utils/request";
export function getAttInfo(data) {
    return request({ method: "get", url: "getAttInfo", params:data});
}
export function searchAttInfo(data){
    return request({ method: "get", url: "searchAttInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function updateAttInfo(data){
    return request({ method: "post", url: "updateAttInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function deleteAttInfo(data){
    return request({ method: "post", url: "deleteAttInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}