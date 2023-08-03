import request from "../../utils/request";
export default function upload(data) {
    return request({ method: "post", url: "/personal/upload/avatarUpload", data, headers: { 'Content-Type': 'multipart/form-data' } });
}