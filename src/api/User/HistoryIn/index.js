import request from "../../../utils/request";
export function getHitoryInfo(data) {
    return request({ method: "get", url: "/written/written/getWrittenById/"+data.id+"/"+data.page+"/"+data.status+"/"+data.storeId+"/"+data.time });
}
export function updataHitory(data) {
    return request({ method: "get", url: "/written/written/getWrittenById",data});
}