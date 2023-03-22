import proxy from "http-proxy-middleware";

export default function (app) {
    app.use(proxy("/d", {
        target: "http://localhost:8888", //配置你要请求的服务器地址
        pathRewrite: {'^/d': ''},
        changeOrigin: true,
    }))
    app.use(proxy("/rest", {
        target: "http://服务器地址2",
        pathRewrite: {'^/data': ''},
        changeOrigin: true,
    }))
};