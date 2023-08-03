import request from "../../../utils/request";

export function getNoticeInfor(data) {
    return request({ method: "post", url: "/manage/notice/getNoticeForPage", data});
}
export function addNoticeInfor(data) {
    return request({ method: "post", url: "/manage/notice/sendNotice", data});
}
export function deleteNoticeInfor(data) {
    return request({ method: "post", url: "/manage/notice/deleteNotice", data});
}