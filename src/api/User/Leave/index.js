import request from "../../../utils/request";
import qs from "qs"
export function getLeaveInfo(data) {
    return request({ method: "get", url: "/written/written/getWrittenById/6af5fc21dcca4de6bbbe81ce535dca0f", params: data });
}
export function addLeaveInfo(data) {
    return request({ method: "post", url: "/written/written/writeWritten", data });
}
export function updateLeaveInfo(data) {
    return request({ method: "post", url: "updateLeaveInfo", data });
}
export function deleteLeaveInfo(data) {
    return request({ method: "post", url: "/written/written/deleteWritten", data });
}
export function dd(data){
    let a=qs.stringify(data)
    console.log(a)
    return request({ method: "post", url: "/written/written/deleteWritten", a ,headers:{"Access-Control-Allow-Origin":"*"} });   
}