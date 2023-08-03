import request from "../../../utils/request";
export function getAttInfo(data) {
    return request({ method: "post", url: "/manage/clockIn/getClockIn", data });
}
export function Publish(data) {
    return request({ method: "post", url: "/manage/clockIn/publishGesture", data });
}
export function searchAttInfo(data) {
    return request({ method: "get", url: "/manage/clockIn/", data });
}
export function updateAttInfo(data) {
    return request({ method: "post", url: "/manage/clockIn/changeClockInType", data, });
}
export function deleteAttInfo(data) {
    return request({ method: "post", url: "/manage/clockIn/deleteClockIn", data, });
}
export function clockIn(data) {
    return request({ method: "post", url: "/personal/clock-in/gestureClockIn", data })
}

export function getClockIn(data){
    return request({ method: "get", url: "/personal/clock-in/isClockIn/"+data.id })
}

export function getClockWeek(data){
    return request({ method: "get", url: "/user/index/getClockInNumWeek/"+data })
}