import request from "../../../utils/request";
export function getStaffInfo(data) {
    return request({ method: "get", url: "getStaffInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function searchStaffInfo(data){
    return request({ method: "get", url: "searchStaffInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function updateStaffInfo(data){
    return request({ method: "post", url: "updateStaffInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function deleteStaffInfo(data){
    return request({ method: "post", url: "deleteStaffInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function addStaffInfo(data){
    return request({ method: "post", url: "addStaffInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}