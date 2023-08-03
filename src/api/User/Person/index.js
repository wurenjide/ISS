import request from "../../../utils/request";
export function getPersonInfo(data) {
    return request({ method: "get", url: "/personal/message/getMessageById/"+data.id, params:data});
}
export function Sigin_In(data) {
    return request({ method: "post", url: "Sigin_In", data});
}
export function updataPersonInfo(data) {
    return request({ method: "post", url: "/personal/message/updateMessage", data});
}