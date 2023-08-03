import request from "../../../utils/request";

export function getRule(data) {
    return request({ method: "get", url: "/service_schedule/admin/rule/getStoreRules/" + data.storeId });
}
export function upbusinessRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-businessRule", data });
}
export function upendRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-endRule", data });
}
export function upmealTimeRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-mealTimeRule", data });
}
export function upnoPassengerFlowRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-noPassengerFlowRule", data });
}
export function uppassengerFlowRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-passengerFlowRule", data });
}
export function upprepareRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-prepareRule", data });
}
export function uprestTimeRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-restTimeRule", data });
}
export function upshiftLimitRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-shiftLimitRule", data });
}
export function upworkHourRule(data) {
    return request({ method: "put", url: "/service_schedule/admin/rule/update-store-workHourRule", data });
}