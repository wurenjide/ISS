import request from "../../../utils/request";
export function getPersonInfo(data) {
    return request({ method: "get", url: "getPersonInfo", params:data});
}
export function Sigin_In(data) {
    return request({ method: "post", url: "Sigin_In", data});
}
export function updataPersonInfo(data) {
    return request({ method: "post", url: "updataPersonInfo", data});
}