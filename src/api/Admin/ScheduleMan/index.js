import request from "../../../utils/request";
export function getWeekInfo(data) {
    return request({ method: "get", url: "getWeekInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function updateWeekInfo(data){
    return request({ method: "post", url: "updateWeekInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function deleteWeekInfo(data){
    return request({ method: "post", url: "deleteWeekInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function addWeekInfo(data){
    return request({ method: "post", url: "addWeekInfo", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}