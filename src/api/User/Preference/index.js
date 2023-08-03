import request from "../../../utils/request";
export function getPerInfo(data) {
    return request({ method: "get", url: "/personal/preference/getPrefer/"+data.id, params: data });
}
export function updatePerInfo(data) {
    return request({ method: "post", url: "/personal/preference/changePrefer", data });
}
export function addPerInfo(data) {
    return request({ method: "post", url: "/personal/preference/addPrefer", data });
}