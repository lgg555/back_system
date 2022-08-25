//整个项目api的管理
import request from "./request"
export default {
    //home组件左侧表格数据获取
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: 'params',
            mock: true
        })
    },
    //home组件右侧count数据获取
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        })
    },
    //echarts
    getEchartsData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            mock: true, //true时调用线上Api,false时是本地Api
            data: params
                // data:{total:0,page:1}
        })
    },
    postUserData(params) {
        return request({
            url: '/user/postUser',
            method: 'post',
            mock: true, //true时调用线上Api,false时是本地Api
            data: params

        })
    }
}