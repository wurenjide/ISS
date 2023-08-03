import request from "../../../utils/request";
export function getSuggestInfo(data) {
    return request({ method: "get", url: "/written/suggest/getAllSuggest/" + data.storeId, });
}
export function deleteSuggestInfo(data) {
    return request({ method: "post", url: "/written/suggest/deleteSuggestById", data });
}