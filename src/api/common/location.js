import request from "./map";
export function getLoction(data) {
    return request({ method: "get", withCredentials: true , params:data});
}