/**
    在这里维护一个全局变量 环境配置
    envConfig = {
        server:"", #服务器
        runTime:""  #运行环境
    }
    全局变量  当前环境，指测试服与正式服所使用的不同域名（接口）
            切换方法是在启动服务（npm run dev）或者打包构建（npm run build）
            的时候带上特有参数如  npm run dev-prod 为正式服
                               npm run dev      为测试服
                            npm run build-prod 同理
            见：package.json
*/
var env = process.envConfig;

var apiAddr = env.server == "production-server" ? "192.168.0.25:8888" : "192.168.0.26/API";


var apiPreUrl = 'http://'+apiAddr;
var uploadUrl = apiPreUrl+'/public/upload-file';
var h5BaseUrl = '';

var config = {
    "env" : env,
    "apiAddr" : apiAddr,
    "apiPreUrl" : apiPreUrl,
    "uploadUrl" : uploadUrl,
    "h5BaseUrl" : h5BaseUrl,
}

export default config;