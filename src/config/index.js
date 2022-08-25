// 环境配置文件
//一般在企业级项目里面有三个环境 开发环境、测试环境、线上环境

//当前环境
const env =
    import.meta.env.MODE || 'prod'

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/cad98c97a909cccad9345dd3dda81ad5/api',
    },
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/cad98c97a909cccad9345dd3dda81ad5/api',
    },
    pro: {
        baseApi: '//future.com/api',
        mockApi: 'https://www.fastmock.site/mock/cad98c97a909cccad9345dd3dda81ad5/api',
    },
}

export default {
    env,
    //mock的总开关
    mock: true,
    ...EnvConfig[env] //解构
}