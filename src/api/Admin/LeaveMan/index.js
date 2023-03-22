import request from "../../../utils/request";

export function getLeaveInfor(data) {
    return request({ method: "get", url: "/manage/written/search", });
}
export function updateLeave(data){
    return request({ method: "post", url: "/manage/written/examine", data});
}