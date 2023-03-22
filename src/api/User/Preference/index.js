import request from "../../../utils/request";
export function getPerInfo(data) {
    return request({ method: "get", url: "getPerInfo", params: data });
}
export function updatePerInfo(data) {
    return request({ method: "post", url: "updatePerInfo", data });
}