import request from "../../../utils/request";
export function getWeekInfo(data) {
    return request({ method: "get", url: "/service_schedule/admin/work-form/getWeekShifts/"+data.store_id+"/"+data.startTime+"/"+data.endTime,params:{position:data.position,employeeName:data.employeeName}});
}
export function getDayInfo(data) {
    return request({ method: "get", url: "/service_schedule/admin/work-form/getDayShifts/"+data.store_id+"/"+data.date,params:data});
}
export function getAlloweStaff(data) {
    return request({ method: "post", url: "/service_schedule/admin/work-form/getShift-ConformEmployee",data});
}
export function addSchedule(data) {
    return request({ method: "post", url: "/service_schedule/admin/work-form/insertShift",data});
}
export function upExecel(data,id,size){
    return request({ method: "post", url: "/service_schedule/admin/work-form/generateShifts/"+id+"/"+size, data, });
}
export function doExecel(data){
    return request({ method: "get", url: "/service_schedule/admin/work-form/getShiftsExcel/"+data.storeId+"/"+data.startDate+"/"+data.endDate, data, });
}
export function inSchedule(data) {
    return request({ method: "put", url: "/service_schedule/admin/work-form/updateShiftEmployee/"+data.employeeId+"/"+data.shiftId+"/"+ data.allowCareer,data});
}
export function deleteSchedule(data){
    return request({ method: "delete", url: "/service_schedule/admin/work-form/delShift/"+data.id, });
}
export function addWeekInfo(data){
    return request({ method: "put", url: "/service_schedule/admin/work-form/scheduleShift/"+data.store_id+"/"+data.startTime+"/"+data.endTime,});
}

export function getWorkTimeById(data){
    return request({ method: "get", url: "/service_schedule/admin/work-form/getEmployeeWorkHour/"+data.id+"/"+data.date+"/"+data.startDate+"/"+data.endDate,});
}