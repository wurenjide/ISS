var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
function geoSuccess(position) {
    console.log(position)
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    console.log(lat+","+lng)
    return lat, lng
}
function geoError(error) {
    console.log(error)
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return alert('定位失败,用户拒绝请求地理定位')
        case error.POSITION_UNAVAILABLE:
            return alert('定位失败,位置信息是不可用')
        case error.TIMEOUT:
            return alert('定位失败,请求获取用户位置超时')
        case error.UNKNOWN_ERROR:
            return alert('定位失败,定位系统失效')
    }
}
export const getPosition = () => {
    if (navigator.geolocation) {
        console.log(1)
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError,options)
    } else {
        alert('浏览器不支持地理定位。');
    }
}
