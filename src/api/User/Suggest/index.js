import request from "../../../utils/request";
export function getSuggestInfo(data) {
    return request({ method: "get", url: "/written/suggest/getSuggestById/"+data.id, params: data });
}
export function addSuggestInfo(data) {
    return request({ method: "post", url: "/written/suggest/submitSuggest", data });
}
export function updateSuggestInfo(data) {
    return request({ method: "post", url: "updateSuggestInfo", data });
}
export function deleteSuggestInfo(data) {
    return request({ method: "post", url: "/written/suggest/deleteSuggestById", data });
}