//二次封装axios
import axios from 'axios'
import config from '../config/index.js'
import { ElMessage } from 'element-plus'
const NETWORK_ERROR = '网络请求异常，请稍后重试.....lgg'
    //创建一个axios实例对象
const service = axios.create({
        baseURL: config.baseApi
    })
    //请求前
service.interceptors.request.use((req) => {
        //自定义header
        //token认证用到header
        return req
    })
    //请求后
service.interceptors.response.use((res) => {
        //console.log(res);
        const { code, data, msg } = res.data
        if (code === 200) {
            return data
        } else {
            //网络请求错误
            ElMessage.error(msg || NETWORK_ERROR)
            return Promise.reject(msg || NETWORK_ERROR)
        }
    })
    //封装的核心函数
function request(options) {
    /* {
     method:'get',
     data:{}
     mock:false
    } */
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    //对mock的处理
    //config.mock为总开关，定义isMock使其可变
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }
    //对线上环境做处理
    if (config.env == 'prod') {
        //项目线上环境不给用mock
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request