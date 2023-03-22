import request from "../../utils/request";
export function setCode(data) {
    return request({ method: "get", url: "/sms/sms/send/"+data.phone, params:data});
}