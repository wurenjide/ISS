import request from "../../../utils/request";
export function getStaffInfo(data) {
    return request({ method: "post", url: "/manage/user/search", data, });
}
export function getAllStaff(data) {
    return request({ method: "get", url: "/manage/user/searchAllUser/" + data.storeId, });
}
export function updateStaffInfo(data) {
    return request({ method: "post", url: "updateStaffInfo", data, });
}
export function deleteStaffInfo(data) {
    return request({ method: "post", url: "/manage/user/deleteUser", data, });
}
export function addStaffInfo(data) {
    return request({ method: "post", url: "addStaffInfo", data, });
}

export function getHomeData() {
    return request({ method: "get", url: "/user/index/indexNum",  });
}
export function getSexData(data) {
    return request({ method: "get", url: "/user/index/getSexRatio/"+data,  });
}
