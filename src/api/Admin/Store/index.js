import request from "../../../utils/request";
export function getAllStore() {
    return request({ method: "get", url: "/manage/store/searchAllStore"});
}
export function getStoreById(data){
    return request({ method: "get", url: "/manage/store/search/"+data.storeId});
}
export function updateStore(data){
    return request({ method: "post", url: "/manage/store/changeStoreInfo", data});
}
export function deleteS(data){
    return request({ method: "post", url: "deleteS", data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
}
export function addStore(data){
    return request({ method: "post", url: "/manage/store/addStore", data });
}