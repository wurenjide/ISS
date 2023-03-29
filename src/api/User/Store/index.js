import request from "../../../utils/request";
export function getAllStore() {
    return request({ method: "get", url: "/manage/store/searchAllStore"});
}