import request from "../../../utils/request";

export function getLeaveInfor(data) {
    return request({ method: "post", url: "/manage/written/search", data});
}
export function updateLeave(data){
    return request({ method: "post", url: "/manage/written/examine", data});
}
export function deleteLeave(data){
    return request({ method: "post", url: "/written/written/deleteWritten", data});
}