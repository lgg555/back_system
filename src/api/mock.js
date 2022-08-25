import Mock from 'mockjs'

import userApi from './mockData/user'
//拦截请求
// Mock.mock('/home/getData', homeApi.getHomeData)

//本地获取user数据
//Mock.mock(/user\/getUser/, 'get', userApi.getUserList) //getUserList在user.js